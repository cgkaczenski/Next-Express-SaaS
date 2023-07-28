import { Metadata } from "next";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getUserApiMethod } from "@/lib/api/public";
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
  const email = session?.user?.email as string;
  const cookie = cookies().get("next-auth.session-token")?.value;
  const user = (await getUserApiMethod(email, cookie)) as user;
  return <YourSettingsPage user={user.user} cookie={cookie} />;
}
