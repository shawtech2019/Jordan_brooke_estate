import Sidebar from "./Sidebar";
import TopBar from "./TopBar";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SystemAdminLayoutProps { element : any }


const SystemAdminLayoutProps = ({element}: SystemAdminLayoutProps ) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto">
        <section>
            {element}
          </section>
        </main>
      </div>
    </div>
  );
};

export default SystemAdminLayoutProps;

