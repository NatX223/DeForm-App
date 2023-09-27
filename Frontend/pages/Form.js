import Head from 'next/head';
import FormResponse from '../components/formResponse';

export default function MyPage() {
  return (
    <div>
      <Head>
        <title>DeForm</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
      <div class="flex items-start justify-between">
        <div class="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
        <div class="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">
          <FormResponse />
        </div>
        </div>
      </div>
      </main>
      <footer>
        <h2>
          Powered by{' Data '}
        </h2>
      </footer>
    </div>
  );
}