import db from "../db";

export interface User {
  slug: string;
  createdAt: Date;
  email: string;
  displayName: string;
  avatarUrl: string;
}

export interface UserRepository {
  getUserBySlug({ slug }: { slug: string }): Promise<User>;

  updateProfile({
    userId,
    name,
    avatarUrl,
  }: {
    userId: string;
    name: string;
    avatarUrl: string;
  }): Promise<User[]>;
}

class UserService {
  database: UserRepository;

  constructor(database: UserRepository) {
    this.database = database;
  }

  public async getUserBySlug({ slug }: { slug: string }): Promise<User> {
    return this.database.getUserBySlug({ slug });
  }

  public async updateProfile({
    userId,
    name,
    avatarUrl,
  }: {
    userId: string;
    name: string;
    avatarUrl: string;
  }): Promise<User[]> {
    return this.database.updateProfile({ userId, name, avatarUrl });
  }
}

const userService = new UserService(db);
export default userService;
