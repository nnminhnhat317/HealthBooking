import { useNavigate } from "react-router";
import { Menu, HelpCircle, Hospital } from "lucide-react";
import logo from "../../assets/images/logo_v4.png";

export const HomeHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-header-container h-[60px] w-full px-10 sticky top-0 bg-white !z-[100]">
      <div className="home-header-content w-full h-full flex">
        <div className="left-content w-1/5 flex items-center">
          <Menu className="text-[25px] text-[#666] cursor-pointer hover:text-[#333]" />
          <img
            className="header-logo h-auto w-auto max-h-[150%] max-w-[150%] cursor-pointer scale-100 ml-0"
            src={logo}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="center-content w-[55%] flex justify-between items-center">
          <div className="child-content mx-[10px] text-[#555] text-center">
            <div>
              <b>
                {/* <FormattedMessage id="home-header.speciality" /> */}
                Chuyên khoa
              </b>
            </div>
            <div className="subs-title font-normal text-[12px] text-[#666]">
              {/* <FormattedMessage id="home-header.search-doctor" /> */}
              Tìm bác sĩ theo chuyên ngành
            </div>
          </div>
          <div className="child-content mx-[10px] text-[#555] text-center">
            <div>
              <b>Cơ sở y tế</b>
            </div>
            <div className="subs-title font-normal text-[12px] text-[#666]">
              Chọn bệnh viện phòng khám
            </div>
          </div>
          <div className="child-content mx-[10px] text-[#555] text-center">
            <div>
              <b>Bác sĩ</b>
            </div>
            <div className="subs-title font-normal text-[12px] text-[#666]">
              Chọn bác sĩ giỏi
            </div>
          </div>
          <div className="child-content mx-[10px] text-[#555] text-center">
            <div>
              <b>Gói khám</b>
            </div>
            <div className="subs-title font-normal text-[12px] text-[#666]">
              Khám sức khỏe tổng quát
            </div>
          </div>
        </div>

        <div className="right-content w-1/4 flex justify-end items-center">
          <div className="support pr-[50px] flex items-center cursor-pointer text-[rgb(77,77,77)] opacity-80">
            <HelpCircle className="text-[15px] mr-[5px]" />
            {/* <FormattedMessage id="home-header.support" /> */}
            Hỗ trợ
          </div>
          {/* Phần đổi ngôn ngữ */}
          {/* <div
          className={
            language === LANGUAGES.VI ? "language-vi active" : "language-vi"
          }
          >
            <span
            onClick={() => this.changeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
          </div> */}

          {/* <div
          className=
          {
            language === LANGUAGES.EN ? "language-en active" : "language-en"
          }
          >
            <span
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div> */}
        </div>
      </div>

      {/* Phần banner */}
    </div>
  );
};
