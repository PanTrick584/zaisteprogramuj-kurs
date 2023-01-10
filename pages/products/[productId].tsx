import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
// import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";
import { serialize } from "next-mdx-remote/serialize";
import { MarkdownResult } from "../../utils";
import { endpoint } from "../../graphql/apolloGraphQL";
import { gql } from "@apollo/client/core";

const ProductIdPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {

    if(!data) return <div>Coś poszło nie tak...</div>
    // const router = useRouter();

    console.log(data);
  return (
    
    <div>
        <Link href="/products">Wróć na stronę główną z produktami</Link>
        <ProductDetails data={{
                    id: data.slug,
                    title: data.name,
                    thumbnailURL: data.images[0].url,
                    thumbnailAlt: data.name,
                    description: data.description,
                    rating: 5,
                    longDescription: data.longDescription
                }} />
    </div>
  )
}

export default ProductIdPage

export const getStaticPaths = async () => {
    // używamy tej funkcji w przypadku SSG, wszystkie strony muszą być wygenerowane 
    // w momencie buildowania, więc nie może być ich nieskończona ilość
    // dlatego dzieki tej funkcji stworzymy potrzebne ścieżki za wczasu

    // const res = await fetch('https://naszsklep-api.vercel.app/api/products');

    // const data: StoreAPI[] = await res.json();

    const { data } = await endpoint.query<StoreSlugs>({
        query: gql`
        query GetProductsList {
            products {
              slug
            }
          }
          
        `
    })

    return {
        paths: data.products.map( prod => {
            return {
                params: {
                    productId: prod.slug
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

    // const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params?.productId}`);

    // // typescript bierze dane z fetch za typ 'any' więc ja poprzez interface narzucam mu typy

    // const data: StoreAPI | null = await res.json();


    const { data } = await endpoint.query<GetStoreDatails>({
        variables: {
           slug:  params.productId
        },
        query: gql`
        query GetProductDetails($slug: String) {
            product(where: {slug: $slug }) {
              slug
              name
              description
              price
              images {
                url
              }
            }
          }
          
        `
    })

    console.log(data);
    
    

    if (!data ) return { props: {}, notFound: true } 

    const getMarkdown = await serialize(data.product.description)

    return {
        props: {
            data: {
                ...data.product,
                longDescription: getMarkdown
            }
        }
    }

    // fetch('https://fakestoreapi.com/products/1')
    // .then(res=>res.json())
    // .then(json=>console.log(json))
};

interface StoreSlugs {
    products: Product[]
}

interface Product {
    slug: string;
}

interface GetStoreDatails {
    product: Product;
}
    interface Product {
        slug: string;
        name: string;
        description: string;
        price: number;
        images: Image[];
    }

    interface Image {
        url: string;
    }