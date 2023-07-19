import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-12 dark:bg-zinc-700">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Home Page</h1>
        <Link href="/test-page">Go to test page</Link>
      </div>
    </div>
  );
}
