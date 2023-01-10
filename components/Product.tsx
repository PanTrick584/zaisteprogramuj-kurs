import Image from "next/image";
import Link from "next/link";
import { Rating } from "../components/Rating";
import Head from "next/head";
import {NextSeo} from 'next-seo'
import { MDXRemote } from 'next-mdx-remote'

import { ProductReactMarkdown } from "./ProductReactMarkdown";
import { MDXRemoteSerializeResult } from "next-mdx-remote/dist";
import { MarkdownResult } from "../utils";
import { useCartState } from "./cart/CartContext";
import { title } from "process";



interface ProductDetails {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownResult
}

interface ProductProps {
  data: ProductDetails;
}

type ProductListItem = Pick<ProductDetails, 'id' | 'title' | 'thumbnailURL' | 'thumbnailAlt' >

interface ProductListItemProps {
    data: ProductListItem;
}
  
export const ProductDetails = ({ data: {title, thumbnailAlt, thumbnailURL, description, longDescription,rating, id} }: ProductProps) => {
    return  <>
              <div>
                <NextSeo 
                    title={title}
                    description={description}
                    canonical={`https://naszsklep-api.vercel.app/api/products/${id}`}
                    openGraph={{
                      url: `https://naszsklep-api.vercel.app/api/products/${id}`,
                      title: title,
                      description: description,
                      images: [
                        {
                          url: thumbnailURL,
                          alt: thumbnailAlt,
                          type: "image/jpeg"
                        }
                      ],
                      siteName: "Mój SKlep"
                    }}
                />
                  <Image 
                        src={thumbnailURL} 
                        alt={thumbnailAlt}
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                      style={{objectFit:"contain"}}
                    />
              </div>
                <h2 className="p-4 text-3xl font-bold">{title}</h2>
                <p className="p-4">{description}</p>
                <article>
                  <MDXRemote {...longDescription}/>
                  {/* <ProductReactMarkdown>
                    {longDescription}
                </ProductReactMarkdown> */}
                </article>
                <Rating rating={rating}/>
            </>
  }



  export const ProductListItem = ({ data }: ProductListItemProps) => {    

    const cartState = useCartState()

    console.log(data);
    

    return  <>
              <div className="bg-white flex justify-center relative w-full h-96">
                  <Image 
                        src={data.thumbnailURL} 
                        alt={data.thumbnailAlt}
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                      style={{objectFit:"contain"}}
                  />
              </div>
              <div  className="flex justify-center relative w-full h-auto">
                  <Link href={`/products/${data.id}`}>
                      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
                  </Link>
              </div>
              <button onClick={() => cartState.addItemToCart({id: data.id, price: 10, title: data.title, count: 1})} >Dodaj do koszytka</button>
            </>
  }