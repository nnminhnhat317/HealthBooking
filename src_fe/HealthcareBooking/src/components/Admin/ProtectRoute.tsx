import { Navigate } from "react-router";
type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const token = localStorage.getItem("token");
  const roleId = localStorage.getItem("roleId");
  // Nếu chưa đăng nhập
  if (!token || !roleId) {
    return <Navigate to="/login" replace />;
  }
  // Nếu vai trò không hợp lệ
  if (!allowedRoles.includes(roleId)) {
    return <Navigate to="/unauthorized" replace />;
  }
  // Nếu hợp lệ thì render children
  return <>{children}</>;
};


