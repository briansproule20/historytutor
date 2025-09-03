import { SignInButton } from "@/components/SignInButton";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">HistoryTutor</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Explore historical context, varying perspectives, and how the world around us was shaped.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <SignInButton />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://litparlor.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by LitParlor
        </a>
      </footer>
    </div>
  );
}
