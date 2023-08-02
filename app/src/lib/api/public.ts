import sendRequestAndGetResponse from "./sendRequestAndGetResponse";

const BASE_PATH = "/api/v1/public";

export async function getUserApiMethod(email: string, cookie: any) {
  return sendRequestAndGetResponse(
    `${BASE_PATH}/get-user-by-email`,
    {
      body: JSON.stringify({ email }),
    },
    cookie
  );
}

export async function updateProfileApiMethod(data: any, cookie: any) {
  return sendRequestAndGetResponse(
    `${BASE_PATH}/user/update-profile`,
    {
      body: JSON.stringify(data),
    },
    cookie
  );
}
