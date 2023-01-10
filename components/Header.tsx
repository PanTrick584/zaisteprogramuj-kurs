import { useRouter } from 'next/router'
import Link from "next/link"
import { CartBar } from './cart/CartBar';

export const Header = () => {

    const router = useRouter();

    return <header className='max-w-7xl mx-auto w-full'>
            <nav className='bg-gray-500 px-4 py-2 text-white'>
                Navigation
                <Link href="/" className={router.asPath == "/" ? "active" : ""}>
                    Main Page
                </ Link>
                <Link href="/about" className={router.asPath == "/about" ? "active" : ""}>
                    About
                </Link>
            </nav>
            <CartBar />

        </header>
}