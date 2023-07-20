import { Metadata } from "next";
import { cookies } from "next/headers";
import getUserApiMethod from "@/lib/api/public";
import YourSettingsPage from "./your-settings";

type user = { user: { email: string; displayName: string; avatarUrl: string } };

export const metadata: Metadata = {
  title: "Your Settings",
  description: "Profile settings page",
};

async function getUser() {
  const cookieStore = cookies();
  const user = (await getUserApiMethod(cookieStore)) as user;
  return user.user;
}

export default async function YourSettings() {
  const user = await getUser();
  return <YourSettingsPage user={user} />;
}
