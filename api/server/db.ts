import * as postgres from "postgres";
import { User, UserRepository } from "./services/User";
import { Session, SessionRepository } from "./services/Session";
import { Team, TeamRepository } from "./services/Team";
import { config } from "dotenv";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

class postgresDatabase
  implements UserRepository, SessionRepository, TeamRepository
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

  public async getUserByEmail({ email }: { email: string }): Promise<User> {
    const users = await this.sql<User[]>`
    SELECT id, email, name as display_name, image as avatar_url FROM next_auth.users WHERE email = ${email}
    `;
    return this.transformer.convertRowToUser(users[0]);
  }

  public async updateProfile({
    userId,
    name,
    avatarUrl,
  }: {
    userId: string;
    name: string;
    avatarUrl: string;
  }): Promise<User> {
    const users = await this.sql<User[]>`
    UPDATE next_auth.users SET name = ${name}, image = ${avatarUrl} WHERE id = ${userId} RETURNING id, email, name as display_name, image as avatar_url;
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
}

class DataTransformer {
  convertRowToUser(row: postgres.Row): User {
    return {
      id: row.id,
      displayName: row.display_name,
      email: row.email,
      avatarUrl: row.avatar_url,
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
