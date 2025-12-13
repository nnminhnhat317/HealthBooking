import React from "react";
import { AdminHeader } from "../Admin/AdminHeader";
import { ChatWidget } from "../Chat";
interface AdminLayoutProps {
  children: React.ReactNode;
}
export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <AdminHeader />
      {children}
      <ChatWidget />
    </div>
  );
};
