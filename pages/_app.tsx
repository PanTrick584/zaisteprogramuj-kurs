import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";
import { Layout } from "../components/Layout";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import { CartStateContextProvider } from "../components/cart/CartContext";
import { ApolloProvider } from "@apollo/client/react";
import { endpoint } from "../graphql/apolloGraphQL";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={endpoint}>
            <CartStateContextProvider>
                <Layout>
                    <DefaultSeo {...SEO} />
                    <QueryClientProvider client={client}>
                        <Component {...pageProps} />
                    </QueryClientProvider>
                </Layout>
            </CartStateContextProvider>
        </ApolloProvider>
    );
}
