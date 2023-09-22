import { cookies } from "next/headers";

export const getServerSideSessionCookie = () => {
  let accessToken: undefined | string;
  cookies()
    .getAll()
    .forEach((cookie) => {
      if (cookie.name.includes("next-auth.session-token")) {
        accessToken = cookie.value;
      }
    });
  return accessToken;
};
