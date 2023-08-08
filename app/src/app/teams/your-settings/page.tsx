import { Metadata } from "next";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import YourSettingsPage from "./your-settings";

type user = { user: { email: string; displayName: string; avatarUrl: string } };

export const metadata: Metadata = {
  title: "Your Settings",
  description: "Profile settings page",
};

export default async function YourSettings() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  let accessToken;
  cookies()
    .getAll()
    .forEach((cookie) => {
      if (cookie.name.includes("next-auth.session-token")) {
        accessToken = cookie.value;
      }
    });
  return <YourSettingsPage cookie={accessToken} />;
}
