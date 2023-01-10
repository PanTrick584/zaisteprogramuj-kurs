import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

interface LayoutProps {
    children: ReactNode
  }

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Moja aplikacja</title>
      </Head>
      <Header />
      <Main>
       <div className='w-full'>{children}</div>
      </Main>
      <Footer />
    </div>
  )
}
