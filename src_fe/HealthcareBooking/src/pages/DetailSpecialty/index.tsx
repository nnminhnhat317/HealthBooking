import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getSpecialtyIdApi } from "@/api/markdown";
import type { Markdown } from "@/types/markdown";
import { getSpecListDocBySpecialtyId } from "@/api/doctorclinicspecialty";
import type { SpecialtyDetailDTO } from "@/types/doctor_clinic_specialty";
import DoctorBookingCard from "@/components/Doctor/DoctorBookingCard";

export const DetailSpecialty: React.FC = () => {
  //Lấy ID từ URL với useParam khi navigate
  const { id } = useParams(); // lấy id từ URL
  const convertIdfromUseParam = (id: string | undefined) => {
    const numericId = Number(id); //chuyển kiểu string|undefined sang number
    return numericId;
  };
  const idConverted = convertIdfromUseParam(id);

  const [specialtyById, setSpecialtyId] = useState<Markdown>(); // markdown
  const [dataListDoctorBySpecialtyId, setDataListDoctorBySpecialtyId] = useState<SpecialtyDetailDTO | null>(null);

  const fetchData = async () => {
    try {
      const data = await getSpecialtyIdApi(idConverted); //hàm async trả về Promise-> cần có await để Promise trả về giá trị thực của api
      setSpecialtyId(data);
      // console.log("Data contentMarkdown:", data);
      const dataListDoctorBySpecialtyId = await getSpecListDocBySpecialtyId(idConverted);
      console.log("Data listdoc:", dataListDoctorBySpecialtyId);
      setDataListDoctorBySpecialtyId(dataListDoctorBySpecialtyId)
    } catch (error) {
      console.error("Lỗi khi lấy nhân viên theo ID, pages/DetailSpecialty:", error);
    }
  };
  useEffect(() => {
    //load dữ liệu vào state
    fetchData();
  }, []);

  return (
    <div>
      <div className="detail-specialty-container">
        <div className="detail-specialty-body px-[100px] pb-10 bg-gray-100 flex flex-col max-md:px-5">
          {/* description-specialty */}

          {specialtyById?.contentHtml && (
            <div
              dangerouslySetInnerHTML={{ __html: specialtyById.contentHtml }}
              className="markdown-detail w-full min-h-[300px] my-4 p-2.5 bg-white shadow-md rounded-lg"
            ></div>
          )}

          {/* each-doctor */}
          {/* Phần Danh sách Bác sĩ */}
          <div className="doctor-list mt-[20px]" >
            {dataListDoctorBySpecialtyId?.doctors && dataListDoctorBySpecialtyId.doctors.length > 0 ? (
              dataListDoctorBySpecialtyId.doctors.map((doc) => (
                <DoctorBookingCard key={doc.id} doctor={doc} />
              ))
            ) : (
              <p>Hiện chưa có bác sĩ nào thuộc chuyên khoa này.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
