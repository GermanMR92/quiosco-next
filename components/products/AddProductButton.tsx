'use client';

import { Product } from "@prisma/client";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
    product: Product;
}

export default function AddProductButton({ product }: AddProductButtonProps) {    

    const addToOrder = useStore((state) => state.addToOrder);
    const disableIncrease = useStore((state) => state.disableIncrease(product.id));

    return (
        <button
            type='button'
            className='disabled:opacity-60 rounded bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
            disabled={disableIncrease}
            onClick={() => addToOrder(product)}>
            Añadir producto
        </button>
    )
}
