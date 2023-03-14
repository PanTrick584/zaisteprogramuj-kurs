import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react/hooks";
import { Main } from "../components/Main";
import { endpoint } from "../graphql/apolloGraphQL";
// import {CreateProductReview} from '../graphql/apolloGraphQL'

const DATA = {
    description: "I'm baby jean shorts squid pork belly hell of plaid DSA skateboard meditation fixie dreamcatcher try-hard photo booth. Plaid freegan godard XOXO, 3 wolf moon chicharrones edison bulb DSA. Tote bag schlitz la croix bicycle rights pok pok wayfarers drinking vinegar microdosing subway tile austin kickstarter coloring book letterpress slow-carb. Salvia tattooed meggings four dollar toast copper mug. Hella hashtag etsy, master cleanse fingerstache direct trade photo booth chillwave bitters. Polaroid pork belly af cardigan chicharrones echo park.",
    thumbnailURL: "",
    thumbnailAlt: "random img",
    rating: 4.5,
    title: "Przykłądowy tytuł",
    id: 123
};

export default function Home() {

  const {loading, error, data} = useQuery(gql`
  query GetProductsList {
    products {
      id
      name
      slug
      price
    }
  }
  
  `)

  // const MainMutation = gql`
  //   mutation CreateProductReview($review: ReviewCreateInput!) {
  //     review: createReview(data: $review) {
  //       id
  //       name
  //       stage
  //     }
  // `

  // const addReview = async () => {
  //     const data = await endpoint.mutate({
  //       mutation: MainMutation
  //     })

  //     console.log(data);
      
  // }

  if(loading) return <Main>Ładowanie....</Main>
  if(error) return <Main>Uuuuuups! Coś zepsułem....</Main>
  return <Main>
            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
            {/* <button onClick={addReview} type={"button"}>Dodaj komentarz</button> */}
        </Main>
}