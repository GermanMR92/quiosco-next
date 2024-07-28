import { prisma } from '@/src/lib/prisma'

async function getCatetories() {
  return prisma.category.findMany({
    where: {
      is_active: true
    }
  })
}

export default async function OrderSidebar() {

  const categories = await getCatetories();
  console.log(categories);
  

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      OrderSidebar
    </aside>
  )
}
