import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
// import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";

const ProductIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {

    if(!data) return <div>Coś poszło nie tak...</div>
    // const router = useRouter();

    console.log(data);
  return (
    
    <div>
        <Link href="/products">Wróć na stronę główną z produktami</Link>
        <ProductDetails data={{
                    id: data.id,
                    title: data.title,
                    thumbnailURL: data.image,
                    thumbnailAlt: data.title,
                    description: data.description,
                    rating: data.rating.rate
                }} />
    </div>
  )
}

export default ProductIdPage

export const getStaticPaths = async () => {
    // używamy tej funkcji w przypadku SSG, wszystkie strony muszą być wygenerowane 
    // w momencie buildowania, więc nie może być ich nieskończona ilość
    // dlatego dzieki tej funkcji stworzymy potrzebne ścieżki za wczasu

    const res = await fetch('https://fakestoreapi.com/products/');

    const data: StoreAPI[] = await res.json();

    return {
        paths: data.map( prod => {
            return {
                params: {
                    productId: prod.id.toString()
                }
            }
        }),
        fallback: false
    }
}


export const getStaticProps = async ({ params }: GetStaticPropsContext<{ productId: string}>) => {

    if (!params?.productId) return { props: {}, notFound: true }


    // PROMISE = nie mamy kontroli nad danymi na serwerze, do których chcemy mieć dostęp
    // nie wiemy czy i kiedy serwer będzie mógł odpowiedzieć
    // może być wolny albo przeciążony
    
    const res = await fetch(`https://fakestoreapi.com/products/${params?.productId}`);

    // typescript bierze dane z fetch za typ 'any' więc ja poprzez interface narzucam mu typy

    const data: StoreAPI | null = await res.json();

    return {
        props: {
            data
        }
    }

    // fetch('https://fakestoreapi.com/products/1')
    // .then(res=>res.json())
    // .then(json=>console.log(json))
};

interface StoreAPI {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}