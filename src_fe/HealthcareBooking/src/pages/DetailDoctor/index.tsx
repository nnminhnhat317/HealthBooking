import { SectionInfo } from "@/components/Doctor/SectionInfo";
import { getDoctorMarkdownApi } from "@/api/markdown";
import { useEffect, useState } from "react";
import type { Markdown } from "@/types/markdown";
export const DetailDoctor: React.FC = () => {
  const [dataMD, setDataMD] = useState<Markdown | null>(null);
  const doctorId = 7; // hard code tạm thời
  const getMarkdown = async () => {
    try {
      // Gọi API để lấy dữ liệu markdown
      const dataMD = await getDoctorMarkdownApi(doctorId);
      setDataMD(dataMD);
      console.log("data markdown in DetailDoctor", dataMD);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu markdown DetailDoctor:", error);
    }
  };
  useEffect(() => {
    getMarkdown();
  }, [doctorId]);
  return (
    <div className="detail-doctor-container">
      <div className="detail-doctor-body px-[100px] bg-[#eee] flex flex-col">
        {/* description-doctor */}
        {/* <div className="description-doctor bg-white p-2.5 my-4 shadow-md rounded-lg"> */}
        <div className="description-doctor bg-white p-2.5 my-4 shadow-md rounded-lg">
          <SectionInfo />
        </div>

        {/* each-doctor */}
        {dataMD?.contentHtml && (
          <div
          dangerouslySetInnerHTML={{ __html: dataMD.contentHtml }}
          className="markdown-detail w-full min-h-[300px] my-4 p-2.5 bg-white shadow-md rounded-lg"
          ></div>
        )}

        {/* );
          })} */}
      </div>
    </div>
  );
};
