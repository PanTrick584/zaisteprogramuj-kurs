import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Main } from "../components/Main";
import { ProductDetails } from "../components/Product";

const DATA = {
    description: "I'm baby jean shorts squid pork belly hell of plaid DSA skateboard meditation fixie dreamcatcher try-hard photo booth. Plaid freegan godard XOXO, 3 wolf moon chicharrones edison bulb DSA. Tote bag schlitz la croix bicycle rights pok pok wayfarers drinking vinegar microdosing subway tile austin kickstarter coloring book letterpress slow-carb. Salvia tattooed meggings four dollar toast copper mug. Hella hashtag etsy, master cleanse fingerstache direct trade photo booth chillwave bitters. Polaroid pork belly af cardigan chicharrones echo park.",
    thumbnailURL: "https://picsum.photos/id/1060/536/354",
    thumbnailAlt: "random img",
    rating: 4.5,
    title: "Przykłądowy tytuł",
    id: 123
};

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Main>
        <ProductDetails data={DATA} />
      </Main>
      <Footer />
    </div>
      )
}