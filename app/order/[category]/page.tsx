import ProductCard from '@/components/products/ProductCard';
import Heading from '@/components/ui/Heading';
import { prisma } from '@/src/lib/prisma'

async function getProducts(categorySlug: string) {
  const products = await prisma.product.findMany({
    where: {
      category: { slug: categorySlug },
      is_active: true
    }
  })

  return products;

}

export default async function OrderPage({ params }: { params: { category: string } }) {

  const products = await getProducts(params.category);
  // TODO: contemplar el caso en el que no haya productos de una categoria porque se pase otra cosa por URL
  return (
    <>
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start'>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product} />
        ))}
      </div>
    </>
  )
}
