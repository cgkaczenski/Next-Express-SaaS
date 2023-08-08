import db from "../db";

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface UserRepository {
  getUserByEmail({ email }: { email: string }): Promise<User>;

  updateProfile({
    userId,
    name,
    avatarUrl,
  }: {
    userId: string;
    name: string;
    avatarUrl: string;
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

  public async updateProfile({
    userId,
    name,
    avatarUrl,
  }: {
    userId: string;
    name: string;
    avatarUrl: string;
  }): Promise<User> {
    return this.database.updateProfile({ userId, name, avatarUrl });
  }
}

const userService = new UserService(db);
export default userService;
