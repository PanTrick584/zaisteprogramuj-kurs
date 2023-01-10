import { ReactNode } from "react";

interface MainProps {
    children: ReactNode
  }
  
export const Main = ({children}: MainProps) => (
    <main className='flex-grow w-full mx-auto w-full p-6 grid gap-6 sm:grid-cols-2 bg-teal-400'>
      {children}
    </main>
  )