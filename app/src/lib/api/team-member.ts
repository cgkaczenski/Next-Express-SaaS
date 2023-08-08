import sendRequestAndGetResponse from "./sendRequestAndGetResponse";

const BASE_PATH = "/api/v1/team-member";

export async function getSignedRequestForUploadApiMethod(
  {
    bucket,
    slug,
    fileName,
  }: {
    bucket: string;
    slug: string;
    fileName: string;
  },
  cookie: any
) {
  return sendRequestAndGetResponse(
    `${BASE_PATH}/get-signed-request-for-upload`,
    {
      body: JSON.stringify({ bucket, slug, fileName }),
    },
    cookie
  );
}

export const uploadFileUsingSignedPutRequestApiMethod = (
  file: File | Blob,
  signedRequest: string,
  headers = {}
) =>
  sendRequestAndGetResponse(signedRequest, {
    externalServer: true,
    method: "PUT",
    body: file,
    headers,
  });
