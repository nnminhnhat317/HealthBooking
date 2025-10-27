import React from "react";
import { HomeFooter } from "@/pages/HomePage/HomeFooter";
import { HomeHeader } from "@/pages/HomePage/HomeHeader";
interface DefaultLayoutProps {
  children: React.ReactNode;
}
export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <HomeHeader />
      {children}
      <HomeFooter />
    </div>
  );
};
