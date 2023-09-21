import db from "../db";

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface UserRepository {
  getUserByEmail({ email }: { email: string }): Promise<User>;

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

  public async getUserByEmail({ email }: { email: string }): Promise<User> {
    return this.database.getUserByEmail({ email });
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
