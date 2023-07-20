import * as postgres from "postgres";
import { User, UserRepository } from "./services/User";
import { config } from "dotenv";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

class postgresDatabase implements UserRepository {
  sql: postgres.Sql;

  constructor(connectionString: string) {
    this.sql = postgres(connectionString, {
      idle_timeout: 20,
      max_lifetime: 30 * 60,
    });
  }

  public async getUserBySlug({ slug }: { slug: string }): Promise<User> {
    const users = await this.sql<User[]>`
      SELECT email, display_name, avatar_url FROM users WHERE slug = ${slug}
    `;
    return users[0];
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
    const users = await this.sql<User[]>`
      UPDATE users SET name = ${name}, avatar_url = ${avatarUrl} WHERE id = ${userId}
    `;
    return users;
  }
}

const db = new postgresDatabase(process.env.DATABASE_URL);
export default db;