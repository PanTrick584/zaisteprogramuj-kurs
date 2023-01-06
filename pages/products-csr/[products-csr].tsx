import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Router, { useRouter } from 'next/router';
import { ProductDetails } from '../../components/Product';

const getProducts = async () => {
    const res = await fetch('https://naszsklep-api.vercel.app/api/products')
    const data: StoreAPI[] = await res.json();
    return data;
}

export default function PsginationCSR() {

    // biblioteka / hook do requestów CSR
    // funkcja przyjmuje argunemty: klucza oraz funkcji wywołującej żądanie
    // obudowuje w inne funkcje i w state reactowy to co otrzymujemy z zapytania

    const [addData, setAddData] = useState(0)
    const [removeData, setremoveData] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [productsMin, setProductsMin] = useState(0)
    const [productsMax, setProductsMax] = useState(4)

    useEffect(() => {
        setCurrentPage(currentPage +1)
        setProductsMin(productsMin +5)
        setProductsMax(productsMax +5)
    }, [addData])
    useEffect(() => {
        setCurrentPage(currentPage -1)
        setProductsMin(productsMin -5)
        setProductsMax(productsMax -5)
    }, [removeData])

    // const router = useRouter()    
    
    const { isLoading, isFetching, data, error, refetch, isPreviousData } = useQuery('products', getProducts)

    if (isLoading) return <div>Loading...</div>
    if (!data ||error) return <div>Coś poszło nie tak</div> 

  return (
    <div>
        {isFetching ? <div>Loading data...</div> :
            <ul className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5'>
                {data?.map( (prod, id) =>
                     id >= productsMin && id <= productsMax && <li key={prod.id} className="shadow-xl border-2 ">
                        <ProductDetails data={{
                            id: prod.id,
                            title: prod.title,
                            description: prod.description,
                            thumbnailURL: prod.image,
                            thumbnailAlt: prod.title,
                            rating: prod.rating.rate
                        }} />
                    </li>
                )}
            </ul>}
            { currentPage > 1 &&
                 <Link 
                    onClick={() =>{ 
                        setremoveData(removeData +1)
                    }}
                    href={`/products-csr/${currentPage}}`}>
                    Powrót!
                </Link>
            }
            <Link 
                onClick={() =>{ 
                    setAddData(addData +1)
                }} 
                href={`/products-csr/${currentPage}}`} >
                
                            Wincyj!
            </Link>
    </div>
  )
}

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