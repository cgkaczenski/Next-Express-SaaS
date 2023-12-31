import db from "../db";
import UserService from "../services/User";

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  teamLeaderId: string;
  memberIds: string[];
}

export interface TeamRepository {
  addTeam({
    userId,
    name,
    logoUrl,
    defaultTeam,
  }: {
    userId: string;
    name: string;
    logoUrl: string;
    defaultTeam: boolean;
  }): Promise<Team>;

  getTeam(criteria: { field: string; value: any }): Promise<Team>;

  getAllTeamsForUser({ userId }: { userId: string }): Promise<Team[]>;
}

class TeamService {
  database: TeamRepository;

  constructor(database: TeamRepository) {
    this.database = database;
  }

  public async addTeam({
    userId,
    name,
    logoUrl,
  }: {
    userId: string;
    name: string;
    logoUrl: string;
  }): Promise<Team> {
    let defaultTeam = false;

    const teamCount = await db.countRecords("team", [
      {
        field: "team_leader_id",
        value: userId,
      },
    ]);

    if (teamCount == 0) {
      defaultTeam = true;
      const team = await this.database.addTeam({
        userId,
        name,
        logoUrl,
        defaultTeam,
      });
      await UserService.findUserByIdAndUpdate({
        userId,
        updates: { default_team_id: team.id },
        returnFields: ["id"],
      });
      return team;
    }

    return this.database.addTeam({ userId, name, logoUrl, defaultTeam });
  }

  public async getTeam(criteria: { field: string; value: any }): Promise<Team> {
    return this.database.getTeam(criteria);
  }

  public async getAllTeamsForUser({
    userId,
  }: {
    userId: string;
  }): Promise<Team[]> {
    return await this.database.getAllTeamsForUser({ userId });
  }
}

const teamService = new TeamService(db);
export default teamService;
