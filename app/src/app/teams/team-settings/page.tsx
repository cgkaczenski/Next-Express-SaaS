import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getDefaultTeamApiMethod } from "@/lib/api/team-member";
import { getServerSideSessionCookie } from "@/lib/serverUtils";
import TeamSettingsPage from "./team-settings";

export const metadata: Metadata = {
  title: "Create Team",
  description: "Create team page",
};

export default async function YourSettings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  let accessToken = getServerSideSessionCookie();
  console.log(accessToken);
  const team = await getDefaultTeamApiMethod(accessToken);
  console.log(team);
  if (!team) {
    redirect("/teams/create-team");
  }
  return <TeamSettingsPage />;
}
