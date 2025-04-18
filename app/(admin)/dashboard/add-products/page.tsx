import ContactsTable from "@/components/contacts-table";
import DashboardHeader from "@/components/dash-boardheader";

export default async function AddProducts() {
  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6">
      <DashboardHeader />

        <div className="min-h-[100vh] flex-1 md:min-h-min">
          <ContactsTable />
        </div>
    </div>
  );
}
