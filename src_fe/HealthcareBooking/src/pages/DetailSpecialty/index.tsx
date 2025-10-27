import { HomeHeader } from "../HomePage/HomeHeader";
export const DetailSpecialty: React.FC = () => {
  return (
    <div>
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body px-[100px] pb-10 bg-gray-100 flex flex-col max-md:px-5">
          {/* description-specialty */}
          <div className="description-specialty bg-white p-[20px_30px] my-5 rounded-lg shadow-md">
            {/* {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
                className="[&>h1]:text-[20px] [&>h1]:font-semibold [&>h1]:mb-2.5 [&>h1]:text-[#333]
                     [&>h2]:text-[20px] [&>h2]:font-semibold [&>h2]:mb-2.5 [&>h2]:text-[#333]
                     [&>h3]:text-[20px] [&>h3]:font-semibold [&>h3]:mb-2.5 [&>h3]:text-[#333]
                     [&>p]:leading-relaxed [&>p]:text-[16px] [&>p]:text-[#555]"
              ></div>
            )} */}
            Description of DetailSpecialty will be here
          </div>

          {/* search-sp-doctor */}
          <div className="search-sp-doctor flex justify-end mb-5">
            Select...
            {/* <select
              onChange={(event) => this.handleOnChangeSelect(event)}
              className="h-[38px] px-3 border border-gray-300 rounded bg-white text-[15px] cursor-pointer transition-all duration-200 ease-in-out hover:border-gray-500 hover:bg-gray-50"
            >
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select> */}
          </div>

          {/* each-doctor */}
          Render List Doctor
          {/* {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div
                  className="each-doctor flex flex-row w-full min-h-[300px] mb-6 p-5 rounded-lg bg-white shadow-lg gap-5 max-md:flex-col"
                  key={index}
                >
                  <div className="dt-content-left flex-1 border-r border-gray-200 max-md:border-r-0 max-md:border-b max-md:pb-4">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right flex-1 flex flex-col gap-5">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="doctor-extra-infor border-t border-gray-200 pt-4">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};
