import Link from "next/link";
import { cookies } from "next/headers";
import { getUserApiMethod } from "@/lib/api/public";

type user = { user: { email: string; displayName: string } };

const slug = "me";

async function getUser() {
  const cookieStore = cookies();
  const user = (await getUserApiMethod(slug, cookieStore)) as user;
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
      <div>
        <p>Email: {user.email}</p>
        <p>Name: {user.displayName}</p>
      </div>
    </div>
  );
}
