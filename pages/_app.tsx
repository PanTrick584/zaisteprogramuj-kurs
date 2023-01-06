import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { QueryClient } from 'react-query'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <div>
            <QueryClientProvider client={client}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </div> 
}
