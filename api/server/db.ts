import * as postgres from "postgres";
import { User, UserRepository } from "./services/User";
import { config } from "dotenv";

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
  config();
}

class postgresDatabase implements UserRepository {
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
  }): Promise<User[]> {
    const users = await this.sql<User[]>`
      UPDATE next_auth.users SET name = ${name}, image = ${avatarUrl} WHERE id = ${userId}
    `;
    return users;
  }
}

class DataTransformer {
  convertRowToUser(row: postgres.Row): User {
    return {
      id: row.id,
      createdAt: row.created_at,
      displayName: row.display_name,
      email: row.email,
      avatarUrl: row.avatar_url,
    };
  }
}

const db = new postgresDatabase(process.env.DATABASE_URL);
export default db;
