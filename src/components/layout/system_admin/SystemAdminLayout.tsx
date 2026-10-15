import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SystemAdminLayoutProps { element : any }


const SystemAdminLayout = ({element}: SystemAdminLayoutProps ) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-30 bg-white">
          <TopBar onMenuToggle={() => setSidebarOpen((v) => !v)} />
        </div>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <section>
            {element}
          </section>
        </main>
      </div>
    </div>
  );
};

export default SystemAdminLayout;
