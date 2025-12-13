import { SectionInfo } from "@/components/Doctor/SectionInfo";
export const DetailClinic: React.FC = () => {
  return (
    <div className="detail-specialty-container">
      <div className="detail-specialty-body px-[100px] bg-[#eee] flex flex-col">
        {/* description-specialty */}
        <div className="description-specialty bg-white p-2.5 my-4 shadow-md rounded-lg">
        <SectionInfo />
        </div>

        {/* each-doctor */}
        <div className="each-doctor flex w-full min-h-[300px] my-4 p-2.5 bg-white shadow-md rounded-lg">
          markdown
        </div>
        {/* );
          })} */}
      </div>
    </div>
  );
};
