export default async function sendRequestAndGetResponse(
  path: string,
  opts: any = {}
) {
  const headers = Object.assign(
    {},
    opts.headers || {},
    opts.externalServer
      ? {}
      : {
          "Content-type": "application/json; charset=UTF-8",
        }
  );

  const { cookie } = opts;
  if (cookie) {
    headers.cookie = cookie;
  }

  const qs = opts.qs || "";

  const response = await fetch(
    opts.externalServer
      ? `${path}${qs}`
      : `${process.env.NEXT_PUBLIC_URL_API}${path}${qs}`,
    opts.externalServer
      ? Object.assign({ method: "POST" }, opts, { headers })
      : Object.assign({ method: "POST", credentials: "include" }, opts, {
          headers,
        })
  );

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  try {
    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof SyntaxError) {
      return response;
    }

    throw err;
  }
}
