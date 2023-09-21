import sendRequestAndGetResponse from "./sendRequestAndGetResponse";

const BASE_PATH = "/api/v1/team-leader";

export async function addTeamApiMethod(
  {
    name,
    logoUrl,
  }: {
    name: string;
    logoUrl: string;
  },
  cookie: any
) {
  return sendRequestAndGetResponse(
    `${BASE_PATH}/teams/add`,
    {
      body: JSON.stringify({ name, logoUrl }),
    },
    cookie
  );
}
