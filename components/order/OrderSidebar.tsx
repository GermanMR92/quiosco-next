import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon';
import Logo from '../ui/Logo';

async function getCatetories() {
  return prisma.category.findMany({
    where: {is_active: true}
  })
}

export default async function OrderSidebar() {

  const categories = await getCatetories();

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className='mt-10'>
        {categories.map( (category => (
          <CategoryIcon 
            key={category.id}
            category={category}
          />
        )))}
      </nav>
    </aside>
  )
}
