import db from "../db";

export interface Session {
  userId: string;
  expires: Date;
  sessionToken: string;
}

export interface SessionRepository {
  getSession({ sessionToken }: { sessionToken: string }): Promise<Session>;
}

class SessionService {
  database: SessionRepository;

  constructor(database: SessionRepository) {
    this.database = database;
  }

  public async getSession({
    sessionToken,
  }: {
    sessionToken: string;
  }): Promise<Session> {
    return this.database.getSession({ sessionToken });
  }
}

const sessionService = new SessionService(db);
export default sessionService;
