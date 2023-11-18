import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getDefaultTeamApiMethod } from "@/lib/api/team-member";
import { getServerSideSessionCookie } from "@/lib/serverUtils";
import TeamSettingsPage from "./team-settings";

export const metadata: Metadata = {
  title: "Team Settings",
  description: "Team settings page",
};

export default async function YourSettings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  //Todo: get team from client state if available
  let accessToken = getServerSideSessionCookie();
  const team = await getDefaultTeamApiMethod(accessToken);
  if (!team) {
    redirect("/teams/create-team");
  }
  return <TeamSettingsPage />;
}
