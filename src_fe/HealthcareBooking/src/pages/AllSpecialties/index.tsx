import { MedicalGrid } from "@/components/General/MedicalGrid";
import { getSpecialtyListApi } from "@/api/specialty"
import { useState, useEffect} from "react"
import { useNavigate } from "react-router";
// const specialties = [
//   { id: 1, title: "Cơ Xương Khớp", image: "/path-to-bone-icon.png" },
//   { id: 2, title: "Thần kinh", image: "/path-to-brain-icon.png" },
//   { id: 3, title: "Tiêu hóa", image: "/path-to-stomach-icon.png" },
//   { id: 4, title: "Tim mạch", image: "/path-to-heart-icon.png" },
//   // ... thêm data
// ];
interface MedicalItem {
  id: number;
  name: string;
  image: string;
}
export default function AllSpecialties() {
  const [specialty, setSpecialty] = useState<MedicalItem[]>([]);
  // const [dataMD, setDataMD] = useState<Markdown | null>(null);
  const getMarkdown = async () => {
    try {
      // Gọi API để lấy dữ liệu markdown
      const data = await getSpecialtyListApi();
      setSpecialty(data);
      console.log("List specialty", data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu specialty tai PageAllSpecialty:", error);
    }
  };

  useEffect(() => {
    getMarkdown();
  }, []);

  // Chuyen trang
  const navigatepage = useNavigate();
  const handleEdit = async (id: number) => {
    try {
      await navigatepage(`/specialty/${id}`);
      // console.log('chuyen trang pages/AllSpecialties')
    } catch {
      console.log("không thể chuyển trang pages - AllSpecialties");
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Phần Chuyên khoa */}
      <MedicalGrid
        sectionTitle="Chuyên khoa"
        items={specialty}
        // onItemClick={(id) => console.log("Navigate to specialty:", id)}
        onItemClick={handleEdit}
      />
    </div>
  );
}
