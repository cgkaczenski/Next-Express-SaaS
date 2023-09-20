import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create Team",
  description: "Create team page",
};

export default async function YourSettings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  redirect("/teams/create-team");
}
