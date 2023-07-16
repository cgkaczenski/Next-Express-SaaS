import DarkModeBtn from "@/components/dark-mode-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-black">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="dark:text-stone-50">Hello World</p>
        <DarkModeBtn />
      </div>
    </main>
  );
}
