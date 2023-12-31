import * as postgres from "postgres";
import { User, UserRepository } from "./services/User";
import { Session, SessionRepository } from "./services/Session";
import { Team, TeamRepository } from "./services/Team";
import { config } from "dotenv";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

interface GenericUtils {
  countRecords(
    tableName: string,
    criteria?: { field: string; value: any }[]
  ): Promise<number>;
}

class postgresDatabase
  implements UserRepository, SessionRepository, TeamRepository, GenericUtils
{
  sql: postgres.Sql;
  transformer: DataTransformer;

  constructor(connectionString: string) {
    this.sql = postgres(connectionString, {
      idle_timeout: 20,
      max_lifetime: 30 * 60,
    });
    this.transformer = new DataTransformer();
  }

  public async getUser(criteria: { field: string; value: any }): Promise<User> {
    const users = await this.sql<User[]>`
    SELECT id, email, name, image, default_team_id FROM next_auth.users WHERE ${this.sql(
      criteria.field
    )} = ${criteria.value}
    `;
    return this.transformer.convertRowToUser(users[0]);
  }

  public async findUserByIdAndUpdate({
    userId,
    updates,
    returnFields,
  }: {
    userId: string;
    updates: { [key: string]: any };
    returnFields: string[];
  }): Promise<User> {
    const columns = Object.keys(updates);

    const users = await this.sql<User[]>`
      UPDATE next_auth.users 
      SET ${this.sql(updates, ...columns)}
      WHERE id = ${userId} RETURNING ${this.sql(returnFields)};
    `;
    return this.transformer.convertRowToUser(users[0]);
  }

  public async getSession({
    sessionToken,
  }: {
    sessionToken: string;
  }): Promise<Session> {
    const sessions = await this.sql<Session[]>`
    SELECT "userId", expires, "sessionToken" FROM next_auth.sessions WHERE "sessionToken" = ${sessionToken}
    `;
    return sessions[0];
  }

  public async addTeam({
    userId,
    name,
    logoUrl,
    defaultTeam,
  }: {
    userId: string;
    name: string;
    logoUrl: string;
    defaultTeam: boolean;
  }): Promise<Team> {
    const teams = await this.sql<Team[]>`
    INSERT INTO team (name, logo_url, team_leader_id, member_ids, default_team) VALUES (${name}, ${logoUrl}, ${userId}, ARRAY[${userId}::UUID], ${defaultTeam} ) RETURNING id, name, logo_url, team_leader_id, member_ids
    `;
    return this.transformer.convertRowToTeam(teams[0]);
  }

  public async countRecords(
    tableName: string,
    criterias?: { field: string; value: any }[]
  ): Promise<number> {
    if (!criterias || criterias.length === 0) {
      const result = await this.sql`SELECT COUNT(*) FROM ${this.sql(
        tableName
      )}`;
      return result[0].count;
    }
    const whereClauses = criterias.map((criteria) => {
      return this.sql`${this.sql([criteria.field])} = ${criteria.value}`;
    });
    const combinedWhereClause = whereClauses.reduce((acc, current, index) => {
      return index === 0 ? current : this.sql`${acc} AND ${current}`;
    }, this.sql``);

    const result = await this.sql`SELECT COUNT(*) FROM ${this.sql(
      tableName
    )} WHERE ${combinedWhereClause}`;

    return result[0].count;
  }

  public async getAllTeamsForUser({
    userId,
  }: {
    userId: string;
  }): Promise<Team[]> {
    const teams = await this.sql<Team[]>`
    SELECT id, name, logo_url, team_leader_id, member_ids FROM next_auth.team WHERE ${userId} = ANY(member_ids)
    `;
    return teams.map((team) => this.transformer.convertRowToTeam(team));
  }

  public async getTeam(criteria: { field: string; value: any }): Promise<Team> {
    const teams = await this.sql<Team[]>`
    SELECT id, name, logo_url, team_leader_id, member_ids FROM team WHERE ${this.sql(
      criteria.field
    )} = ${criteria.value}
    `;
    return this.transformer.convertRowToTeam(teams[0]);
  }
}

class DataTransformer {
  convertRowToUser(row: postgres.Row): User {
    return {
      id: row.id,
      displayName: row.name,
      email: row.email,
      avatarUrl: row.image,
      defaultTeamId: row.default_team_id,
    };
  }

  convertRowToTeam(row: postgres.Row): Team {
    return {
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url,
      teamLeaderId: row.team_leader_id,
      memberIds: row.member_ids,
    };
  }
}

const db = new postgresDatabase(process.env.DATABASE_URL);
export default db;
