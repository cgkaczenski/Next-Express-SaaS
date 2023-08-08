import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import YourSettingsPage from "./your-settings";

export const metadata: Metadata = {
  title: "Your Settings",
  description: "Profile settings page",
};

export default async function YourSettings() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return <YourSettingsPage />;
}
