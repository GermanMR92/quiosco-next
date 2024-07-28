import Image from 'next/image'
import { formatCurrency } from '@/src/utils'
import { Product } from '@prisma/client'

// Define the props of this component
type ProductCardProps = {
    product: Product,
}

// TODO: Hacer las tarjetas siempre del mismo tamaño (Si el nombre es mayor, que se ajuste el tamaño de la tarjeta)
// TODO: Hacer que las imagenes encajen en cualquier resolucion
export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className='border bg-white'>

            <Image
                width={400}
                height={500}
                src={`/products/${product.image}.jpg`}
                alt={`Imagen ${product.name}`}
            />

            <div className='p-5'>
                <h3 className='text-xl font-bold'>{product.name}</h3>
                <p className='mt-5 font-black text-xl text-amber-500'>{formatCurrency(product.price)}</p>
                <button type='button' className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'>Añadir producto</button>
            </div>
        </div>
    )
}