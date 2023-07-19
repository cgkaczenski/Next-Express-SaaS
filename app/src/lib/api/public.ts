import sendRequestAndGetResponse from "./sendRequestAndGetResponse";

const BASE_PATH = "/api/v1/public";

export default async function getUserApiMethod(cookie: any) {
  return sendRequestAndGetResponse(`${BASE_PATH}/get-user`, {
    cookie,
    method: "GET",
  });
}
