import { Menu, HelpCircle } from "lucide-react";
import { LogOut } from 'lucide-react';
export const AdminHeader: React.FC = () => {
  const handleLogout = () => {
    console.log('Đăng xuất');
    //logic đăng xuất 
  };
  return (
      <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu bên trái */}
          <div className="flex space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Hệ thống
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Quản lý lịch khám
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Quản lý bác sĩ
            </a>
          </div>

          {/* Nút đăng xuất bên phải */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
