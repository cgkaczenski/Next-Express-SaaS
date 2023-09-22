import db from "../db";

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  defaultTeamId: string;
}

export interface UserRepository {
  getUser(criteria: { field: string; value: any }): Promise<User>;

  findUserByIdAndUpdate({
    userId,
    updates,
    returnFields,
  }: {
    userId: string;
    updates: object;
    returnFields: string[];
  }): Promise<User>;
}

class UserService {
  database: UserRepository;

  constructor(database: UserRepository) {
    this.database = database;
  }

  public async getUser(criteria: { field: string; value: any }): Promise<User> {
    return this.database.getUser(criteria);
  }

  public async findUserByIdAndUpdate({
    userId,
    updates,
    returnFields,
  }: {
    userId: string;
    updates: object;
    returnFields: string[];
  }): Promise<User> {
    return this.database.findUserByIdAndUpdate({
      userId,
      updates,
      returnFields,
    });
  }
}

const userService = new UserService(db);
export default userService;
