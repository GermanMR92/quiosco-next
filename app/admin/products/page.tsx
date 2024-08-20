import Heading from "@/components/ui/Heading";
import { getProducts } from "@/actions/get-products-action";
import { getProductsCount } from "@/actions/get-products-count-action";
import ProductTable from "@/components/products/ProductsTable";
import ProductPagination from "@/components/products/ProductPagination";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";


export default async function ProductsPage({ searchParams }: { searchParams: { page: string, search: string } }) {

  console.log('searchParams', searchParams.search);
  const page = +searchParams.page || 1;
  const pageSize = 10; // TODO: poner en un archivo de constantes

  if(searchParams.search == undefined) {
    console.log('no hay criterios de busquedas');
    if (page <= 0) redirect('/admin/products?page=1');// TODO: todas las rutas ponerlas en un archivo con constantes
  }

  // A promise that resolves to an array containing the fetched products and their total count.
  const [products, totalProducts] = await Promise.all([
    getProducts(true, page, pageSize, searchParams.search),
    getProductsCount(true, searchParams.search)
  ])

  const totalPages = Math.ceil(totalProducts / pageSize);
  
  if(searchParams.search == undefined) {
    if (page > totalPages) redirect('/admin/products?page=1')// TODO: todas las rutas ponerlas en un archivo con constantes
  }

  return (
    <>
      <Heading>
        Administrar productos
      </Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link 
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductPagination page={page} totalPages={totalPages} />
    </>
  )
}