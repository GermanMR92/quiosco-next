import Link from "next/link";

type ProductPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductPagination({ page, totalPages }: ProductPaginationProps) {

  // Create an array of page numbers from 1 to totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <nav className='flex justify-center py-10 gap-1'>
      {page > 1 &&
        <Link 
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" 
          href={`/admin/products?page=${page - 1}`}>
            «
        </Link>
      }

      {pages.map(currentPage => (
          <Link 
            key={currentPage} 
            className={`${currentPage === page && 'font-black'} bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`} 
            href={`/admin/products?page=${currentPage}`}>
              {currentPage}
          </Link>
      ))}

      {page < totalPages &&
        <Link 
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" 
          href={`/admin/products?page=${page + 1}`}>
            »
        </Link>
      }
    </nav>
  )
}
