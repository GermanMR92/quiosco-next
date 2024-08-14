import Heading from "@/components/ui/Heading";
import {getProducts} from "@/actions/get-products-action";
import ProductTable from "@/components/products/ProductsTable";


export default async function ProductsPage() {

  let is_active = true;
  const products = await getProducts(is_active);

  return (
    <>
      <Heading>
        Administrar productos
      </Heading>

      <ProductTable products={products} />
    </>
  )
}