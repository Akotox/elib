import ContactsTable from "@/components/contacts-table";
import DashboardHeader from "@/components/dash-boardheader";
import ProductsTable from "@/components/products-table";
import { getProducts } from "@/server/admin/getProducts";

export default async function Products() {
    const products = await getProducts();
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <DashboardHeader />

        <div className="min-h-[100vh] flex-1 md:min-h-min">
          <ProductsTable products={products} />
        </div>
    </div>
  );
}
