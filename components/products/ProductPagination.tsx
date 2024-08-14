import Link from "next/link";

type ProductPaginationProps = {
  page: number;
};

export default function ProductPagination({ page }: ProductPaginationProps) {
  return (
    <nav className='flex justify-center py-10'>
      <Link href={`/admin/products?page=${page-1}`}>«</Link>
      <Link href={`/admin/products?page=${page+1}`}>»</Link>
    </nav>
  )
}
