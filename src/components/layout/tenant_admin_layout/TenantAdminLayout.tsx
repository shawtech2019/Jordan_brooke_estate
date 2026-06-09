
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

interface TenantDashboardLayoutProps { element : any }


const TenantDashboardLayout = ({element}: TenantDashboardLayoutProps ) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <main className="flex-1 p-6 overflow-auto">
        <section>
            {element}
          </section>
        </main>
      </div>
    </div>
  );
};

export default TenantDashboardLayout;
