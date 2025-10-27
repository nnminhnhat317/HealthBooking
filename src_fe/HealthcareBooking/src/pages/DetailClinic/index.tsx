export const DetailClinic: React.FC = () => {
  return (
    <div className="detail-specialty-container">
      <div className="detail-specialty-body px-[100px] bg-[#eee] flex flex-col">
        {/* description-specialty */}
        <div className="description-specialty bg-white p-2.5 my-4">
          Description
          {/* {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic.descriptionHTML || "",
                }}
                className="[&>h1]:text-[16px] [&>h1]:font-semibold
                       [&>h2]:text-[16px] [&>h2]:font-semibold
                       [&>h3]:text-[16px] [&>h3]:font-semibold"
              ></div>
            </>
          )} */}
        </div>

        {/* each-doctor */}
        {/* {arrDoctorId &&
          arrDoctorId.length > 0 &&
          arrDoctorId.map((item, index) => {
            return ( */}
              <div
                // key={index}
                className="each-doctor flex w-full min-h-[300px] my-4 p-2.5 bg-white shadow-md rounded-lg"
              >
                {/* left */}
                <div className="dt-content-left w-1/2 border-r border-gray-300">
                  <div className="profile-doctor">
                    profile doctor
                    {/* <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
                      isShowLinkDetail={true}
                      isShowPrice={false}
                    /> */}
                  </div>
                </div>

                {/* right */}
                <div className="dt-content-right w-1/2 p-2.5">
                  <div className="doctor-schedule">
                    Doctor Schedule
                    {/* <DoctorSchedule doctorIdFromParent={item} /> */}
                  </div>
                  <div className="doctor-extra-infor border-t border-gray-300 mt-2.5 pt-2.5">
                    Extra Infor
                    {/* <DoctorExtraInfor doctorIdFromParent={item} /> */}
                  </div>
                </div>
              </div>
            {/* );
          })} */}
      </div>
    </div>
  );
};
