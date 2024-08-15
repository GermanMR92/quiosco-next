import Heading from "@/components/ui/Heading";
import { getProducts } from "@/actions/get-products-action";
import { getProductsCount } from "@/actions/get-products-count-action";
import ProductTable from "@/components/products/ProductsTable";
import ProductPagination from "@/components/products/ProductPagination";
import { redirect } from "next/navigation";


export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) redirect('/admin/products?page=1');

  // A promise that resolves to an array containing the fetched products and their total count.
  const [products, totalProducts] = await Promise.all([
    getProducts(true, page, pageSize),
    getProductsCount(true)
  ])

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect('/admin/products?page=1')

  return (
    <>
      <Heading>
        Administrar productos
      </Heading>

      <ProductTable products={products} />

      <ProductPagination page={page} totalPages={totalPages} />
    </>
  )
}