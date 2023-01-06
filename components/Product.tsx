import Image from "next/image";
import Link from "next/link";
import { Rating } from "../components/Rating";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailURL: string;
  thumbnailAlt: string;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

type ProductListItem = Pick<ProductDetails, 'id' | 'title' | 'thumbnailURL' | 'thumbnailAlt' >

interface ProductListItemProps {
    data: ProductListItem;
}
  
export const ProductDetails = ({ data: {title, thumbnailAlt, thumbnailURL, description, rating} }: ProductProps) => {
    return  <>
              <div>
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
                <p className="p-4">
                {description}
                </p>
                <Rating rating={rating}/>
            </>
  }

  export const ProductListItem = ({ data }: ProductListItemProps) => {    
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
            </>
  }