import Image from 'next/image'
import { formatCurrency } from '@/src/utils'
import { Product } from '@prisma/client'
import AddProductButton from './AddProductButton' // Client component

// Define the props of this component
type ProductCardProps = {
    product: Product,
}

// TODO: Hacer que las imagenes encajen en cualquier resolucion (FHD o superior)
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className='rounded border bg-white overflow-auto flex flex-col justify-between h-full'>

            <Image
                width={400}
                height={500}
                src={`/products/${product.image}.jpg`}
                alt={`Imagen ${product.name}`}
            />

            <div className='p-5'>
                <h3 className='text-xl font-bold'>{product.name}</h3>
                <p className='mt-5 font-black text-xl text-amber-500'>{formatCurrency(product.price)}</p>
                <AddProductButton product={product}/>
            </div>
        </div>
    )
}
