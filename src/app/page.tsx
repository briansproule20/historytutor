import { SignInButton } from "@/components/SignInButton";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HistoryTutor</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explore historical context, varying perspectives, and how the world around us was shaped.
              </p>
            </div>
            <SignInButton />
          </div>
        </div>
      </header>

      <main className="py-8">
        <Chat />
      </main>
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-400"
              href="https://litparlor.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by LitParlor
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
