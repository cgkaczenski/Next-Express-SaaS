import sendRequestAndGetResponse from "./sendRequestAndGetResponse";

const BASE_PATH = "/api/v1/public";

export async function getUserApiMethod(slug: string, cookie: any) {
  return sendRequestAndGetResponse(`${BASE_PATH}/get-user-by-slug`, {
    cookie,
    method: "POST",
    body: JSON.stringify({ slug }),
  });
}

export async function updateProfileApiMethod(data: any, cookie: any) {
  return sendRequestAndGetResponse(`${BASE_PATH}/user/update-profile`, {
    cookie,
    method: "POST",
    body: JSON.stringify(data),
  });
}
