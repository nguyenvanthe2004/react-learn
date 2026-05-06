import { useState, type ReactNode } from "react";
import Sidebar from "../components/ui/SideBar";
import Header from "../components/ui/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1">
        <Header toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 bg-white overflow-auto">{children}</main>
      </div>
    </div>
  );
}
