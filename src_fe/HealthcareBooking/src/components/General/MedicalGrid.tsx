import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MedicalItem {
  id: number;
  name: string;
  image: string;
}

interface MedicalGridProps {
  sectionTitle?: string;
  items: MedicalItem[];
  onItemClick?: (id: number) => Promise<void>;
}
// Dùng cho list specialty, clinic
export const MedicalGrid: React.FC<MedicalGridProps> = ({
  sectionTitle,
  items,
  onItemClick,
}) => {
  return (
    <div className="w-full py-8">
      {sectionTitle && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold uppercase text-gray-800 tracking-tight">
            {sectionTitle}
          </h2>
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors font-medium">
            XEM THÊM
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer border-none shadow-none hover:shadow-md transition-all duration-300 group"
            onClick={() => onItemClick?.(item.id)}
          >
            <CardContent className="p-0">
              {/* Container cho ảnh */}
              <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center p-4">
                <img
                  // src={item.image} // gốc 
                  src={`http://localhost:8080${item?.image}`} // gọi api image
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Tiêu đề */}
              <div className="p-4 text-center">
                <h3 className="text-[15px] font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
