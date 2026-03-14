import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#e8e9ed] overflow-hidden">
      <aside className={`h-full transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>
        <Sidebar open={sidebarOpen} />
      </aside>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;