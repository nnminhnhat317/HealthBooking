import { Menu, HelpCircle } from "lucide-react";
export const Header: React.FC = () => {
  return (
      <header className="w-full shadow-sm border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-4">
            <button className="text-gray-600 md:hidden">
              <Menu size={24} />
            </button>
            <img src="/logo.svg" alt="Carevo" className="h-6 w-auto" />
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex gap-8">
            <div className="text-center cursor-pointer">
              <p className="font-semibold text-sm text-gray-800">Chuyên khoa</p>
              <p className="text-xs text-gray-500">
                Tìm bác sĩ theo chuyên ngành
              </p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="font-semibold text-sm text-gray-800">Cơ sở y tế</p>
              <p className="text-xs text-gray-500">Chọn bệnh viện phòng khám</p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="font-semibold text-sm text-gray-800">Bác sĩ</p>
              <p className="text-xs text-gray-500">Chọn bác sĩ giỏi</p>
            </div>
            <div className="text-center cursor-pointer">
              <p className="font-semibold text-sm text-gray-800">Gói khám</p>
              <p className="text-xs text-gray-500">Khám sức khỏe tổng quát</p>
            </div>
          </nav>

          {/* Right: Support + Language */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-700 cursor-pointer">
              <HelpCircle size={16} />
              <span>Hỗ trợ</span>
            </div>
            <div className="text-sm">
              <span className="text-yellow-500 font-semibold">VN</span>
              <span className="mx-1 text-gray-400">|</span>
              <span className="text-gray-700">EN</span>
            </div>
          </div>
        </div>
      </header>
  );
};
