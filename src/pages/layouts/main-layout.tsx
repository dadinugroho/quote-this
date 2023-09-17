import { ReactNode } from "react";
import { Header } from "@/components/navs/header";

type LayoutProps = {
  children: ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <div className="h-full flex-col md:flex">
        <Header />
        <div className="flex-1 space-y-4 p-4  h-full flex-col md:flex">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
