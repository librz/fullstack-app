import { FC } from "react";
import { Outlet } from "react-router-dom";
import { NavbarSimple } from "@/components/Navbar";

const MainLayout: FC = () => {
  return (
    <div className="flex">
      <NavbarSimple />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export { MainLayout };
