import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserApiMethod } from "@/lib/api/public";
import { getDefaultTeamApiMethod } from "@/lib/api/team-member";
import { StoreProvider } from "@/components/store-provider";
import { getServerSideSessionCookie } from "@/lib/serverUtils";

export default async function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div>Unauthorized</div>;
  }
  const email = session?.user?.email as string;
  let accessToken = getServerSideSessionCookie();
  //Put team data in getUserApiMethod
  const user = await getUserApiMethod(email, accessToken);
  const team = await getDefaultTeamApiMethod(accessToken);

  const initialData = {
    user,
    team,
    accessToken: accessToken as string,
  };

  return (
    <section>
      <StoreProvider initialData={initialData}>
        <Navbar />
        <Sidebar />
        <div className="lg:pl-72 ">{children}</div>
      </StoreProvider>
    </section>
  );
}
