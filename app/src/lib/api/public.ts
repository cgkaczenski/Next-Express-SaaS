import sendRequestAndGetResponse from "./sendRequestAndGetResponse";

const BASE_PATH = "/api/v1/public";

export async function getUserApiMethod(email: string, cookie: any) {
  return sendRequestAndGetResponse(`${BASE_PATH}/get-user-by-email`, {
    cookie,
    body: JSON.stringify({ email }),
  });
}

export async function updateProfileApiMethod(data: any, cookie: any) {
  return sendRequestAndGetResponse(`${BASE_PATH}/user/update-profile`, {
    cookie,
    body: JSON.stringify(data),
  });
}
