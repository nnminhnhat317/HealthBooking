import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
export const HomeFooter: React.FC = () => {
  return (
    <div className="home-footer bg-[#EFEFEF] text-[#1e1e1e] py-5 text-sm">
      <div className="footer-container container flex flex-wrap justify-between items-start">
        <div className="footer-section company-info w-[30%] flex flex-col">
          <h4 className="text-[16px] font-bold mb-[10px]">Công ty Carevo</h4>
          <p className="my-[5px] text-[#1e1e1e] items-start text-left">
            📍 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh
          </p>
          <p className="my-[5px] text-[#1e1e1e] items-start text-left">
            🔖 Ngày thành lập: 11 tháng 11, 1956
          </p>
          <p className="my-[5px] text-[#1e1e1e] items-start text-left">
            📞 024-7301-2489 (7h - 18h)
          </p>
          <p className="my-[5px] text-[#1e1e1e] items-start text-left">
            📧 support@carevo.vn (7h - 18h)
          </p>
          <p className="my-[5px] text-[#1e1e1e] items-start text-left">
            📍 Tòa nhà H6, 12 Nguyễn Văn Bảo, Hồ Chí Minh
          </p>
        </div>

        <div className="footer-section quick-links w-[30%] flex flex-col">
          <h4>Liên kết</h4>
          {/* <ul>
              <li><a href="#">Liên hệ hợp tác</a></li>
              <li><a href="#">Chuyển đổi số</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Quy chế hoạt động</a></li>
              <li><a href="#">Tuyển dụng</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
              <li><a href="#">Sức khỏe doanh nghiệp</a></li>
            </ul> */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Liên hệ hợp tác
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Chuyển đổi số</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Chính sách bảo mật
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Quy chế hoạt động
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Tuyển dụng</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Điều khoản sử dụng
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Câu hỏi thường gặp
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">
                  Sức khỏe doanh nghiệp
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="footer-section partners w-[30%] flex flex-col items-center">
          <h4>Sinh viên thực hiện</h4>
          <div className="partner flex items-center mb-[10px]">
            <p className="ml-[10px] text-[13px] text-[#1e1e1e]">
              NNNMN
            </p>
          </div>
          <div className="partner flex items-center mb-[10px]">
            <p className="ml-[10px] text-[13px] text-[#1e1e1e]">
              <strong>Giảng viên hướng dẫn</strong>
              <br />
              ThS. 
            </p>
          </div>
        </div>
      </div>

      <div className="footer-download text-center pt-[15px] border-t border-[#ddd]">
        <p className="my-[10px]">
          XÂY DỰNG VÀ TRIỂN KHAI ỨNG DỤNG WEB ĐẶT LỊCH KHÁM BỆNH CHO PHÒNG KHÁM
          TƯ NHÂN - 2025
        </p>
      </div>
    </div>
  );
};
