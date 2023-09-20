import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
import { getUserApiMethod } from "@/lib/api/public";
import { StoreProvider } from "@/components/store-provider";

export default async function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  let initialData = null;
  if (session) {
    const email = session?.user?.email as string;
    let accessToken: undefined | string;
    cookies()
      .getAll()
      .forEach((cookie) => {
        if (cookie.name.includes("next-auth.session-token")) {
          accessToken = cookie.value;
        }
      });
    const user = await getUserApiMethod(email, accessToken);

    initialData = {
      user,
      accessToken: accessToken as string,
    };
  }
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
