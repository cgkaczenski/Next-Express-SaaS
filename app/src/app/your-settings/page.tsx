import { Metadata } from "next";
import { cookies } from "next/headers";
import { getUserApiMethod } from "@/lib/api/public";
import YourSettingsPage from "./your-settings";

type user = { user: { email: string; displayName: string; avatarUrl: string } };
const slug = "me";

export const metadata: Metadata = {
  title: "Your Settings",
  description: "Profile settings page",
};

export default async function YourSettings() {
  const cookieStore = cookies();
  const user = (await getUserApiMethod(slug, cookieStore)) as user;
  return <YourSettingsPage user={user.user} cookie={cookieStore} />;
}
