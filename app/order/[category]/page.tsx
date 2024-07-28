import { prisma } from '@/src/lib/prisma'



async function getProducts(categorySlug: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {slug: categorySlug},
      is_active: true
    }
  })

  return products;

}

export default async function OrderPage({params}: {params: {category: string}}) {

  const products = await getProducts(params.category);
  console.log(products);
  
  return (
    <div>OrderPage index</div>
  )
}
