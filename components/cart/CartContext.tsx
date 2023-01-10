import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CartItem {
    id: string;
    price: number;
    title: string;
    count: number
}

interface CartState {
    items: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: CartItem['id']) => void;
    // wyczyść koszyk
}

export const CartStateContext = createContext<CartState | null>(null)

export const CartStateContextProvider = ({ children }: {children: ReactNode;}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const getItemsFromStorage = () => {
        const localItems = localStorage.getItem("MOJ_SHOPPING_CART")
        console.log(localItems);
        
        if(!localItems) return [];
            // LOCAL STORAGE NIE DZIAŁA NA TEN MOMENT!!!
        try {
            const items = JSON.parse(localItems);
            // zakładamy że items z local storage posiada prowidłowe wartości, nikt tam nie grzebał, nic się na nadpisało innymi local storageami
           return items;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    const setItemsToStorage = (cartItems: CartItem[] | []) => {
        if(!cartItems) return;
        localStorage.setItem("MOJ_SHOPPING_CART", JSON.stringify(cartItems))
    }

    useEffect(() => {
        setCartItems(getItemsFromStorage());
    },[])
    // "MOJ_SHOPPPING_CART"
    // odczyutać z local storage
    // jeśli coś tam jest to ustawić jako wartość stanu
    // zapisać do local storage przy zmianie

    useEffect(() => {
        setItemsToStorage(cartItems)
    },[ cartItems])

    return <CartStateContext.Provider value={{ 
        items: cartItems,
        addItemToCart: (item) => { 
            setCartItems( prevState =>{ 
                const existingItem = prevState.find(existingItem => existingItem.id === item.id);
                if(!existingItem) return [...cartItems, item]
                // const newItem ={ ...existingItem, count: existingItem.count + 1}

                return prevState.map( existingItem => {
                    return existingItem.id === item.id ? {...existingItem, count: existingItem.count + 1} : existingItem
                })

            }) 
        },
        removeItemFromCart: (id ) => {
            setCartItems( prevState =>{ 
                const existingItem = prevState.find(existingItem => existingItem.id === id);
                if(existingItem && existingItem.count === 1) return prevState.filter(existingItem => existingItem.id === id)
                // const newItem ={ ...existingItem, count: existingItem.count + 1}

                return prevState.map( existingItem => {
                    return existingItem.id === id ? {...existingItem, count: existingItem.count - 1} : existingItem
                })

            }) 
        }
     }}>{ children }</CartStateContext.Provider>
}

export const useCartState = () => {
    const cartState = useContext(CartStateContext)
    if(!cartState) {
        throw new Error('You forgot CartStateContextProvider')
    }
    return cartState
}