import Link from "next/link";
import { cookies } from "next/headers";
import getUserApiMethod from "@/lib/api/public";

type user = { user: { email: string } };

async function getUser() {
  const cookieStore = cookies();
  const user = (await getUserApiMethod(cookieStore)) as user;
  return user.user;
}

export default async function Home() {
  const user = await getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12 dark:bg-zinc-700">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Home Page</h1>
        <Link href="/test-page">Go to test page</Link>
      </div>
      <p>Email: {user.email}</p>
    </div>
  );
}
