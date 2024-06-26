import TableContainer from '@/components/table';
import { Inter } from '@next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });
function Home() {
  return (
    <>
      <Head>
        <title>SFVN | HOME</title>
      </Head>
      <main className={inter.className}>
        <TableContainer />
      </main>
    </>
  );
}

export default Home;
