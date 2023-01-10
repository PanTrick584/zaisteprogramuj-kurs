import {
    ApolloClient,
    InMemoryCache
} from "@apollo/client"

export const endpoint = new ApolloClient({
    uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clcqk0z3h00yi01udbzru2u8r/master',
    cache: new InMemoryCache()
})