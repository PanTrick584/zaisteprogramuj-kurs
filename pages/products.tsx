import { ApolloClient, gql } from '@apollo/client/core';
import { InferGetStaticPropsType } from 'next';
import React from 'react'
import { ProductListItem } from '../components/Product';
import { endpoint } from '../graphql/apolloGraphQL';

export default function ProductsPage({ data }: InferGetStaticPropsType<typeof getStaticProps>) {

    // czyli tutaj ^ w propsach dostanę odpowiedź z serwera która będzie tym, co zwróci mi funkcja getStaticProps na serwerze
    // dostarczane przez Next.js
    // tam ^ w {}; będzie data, bo to zwracam w funkcji getStaticProps ( return { props: { data } } )

  return (
        <ul className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5'>
            {data.products.map( prod => <li key={prod.id} className="shadow-xl border-2 h-max">
                <ProductListItem data={{
                    id: prod.slug,
                    title: prod.name,
                    thumbnailURL: prod.images[0].url,
                    thumbnailAlt: prod.name
                }} />
            </li>)}
        </ul>
  )
}

// domyslna funkcja Next.js, wykonywana przy generowaniu strony na serwerze, 
// dane  zniej są przechowywane gdzieś w Next.js
// i przekazywane później do renderujących się komponentów Reactowych.
// Next.js wywala tę funkcję w procesie deploymentu i nie jest ona później dostępna,
// wykonuje się w kontekście Node.js, runtime'a na serwerze a nie u użytkownika
// mogą zachodzić różnice w zależnościach w komponentach
export const getStaticProps = async () => {

    const { data } = await endpoint.query<StoreAPIQL>({
        query: gql`
        query GetProductsList {
            products {
              id
              name
              slug
              price
              images(first: 1) {
                url
                width
                height
              }
            }
          }
          
        `
    })

    // PROMISE = nie mamy kontroli nad danymi na serwerze, do których chcemy mieć dostęp
    // nie wiemy czy i kiedy serwer będzie mógł odpowiedzieć
    // może być wolny albo przeciążony
    
    // const res = await fetch('https://naszsklep-api.vercel.app/api/products');

    // // typescript bierze dane z fetch za typ 'any' więc ja poprzez interface narzucam mu typy

    // const data: StoreAPI[] = await res.json();

    return {
        props: {
            data
        }
    }

    // fetch('https://fakestoreapi.com/products/1')
    // .then(res=>res.json())
    // .then(json=>console.log(json))
};


interface StoreAPIQL {
    products: Product[]
}

interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    images: Image[]
}

interface Image {
    url: string;
}

interface StoreAPI {
    id: string;
    title: string;
    price: number;
    description: string;
    longDescription: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}