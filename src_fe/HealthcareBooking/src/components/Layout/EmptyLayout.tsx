import React from "react";
interface EmptyLayoutProps {
  children: React.ReactNode;
}
export const EmptyLayout: React.FC<EmptyLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    {/* <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10"> */}
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};
