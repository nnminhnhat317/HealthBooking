import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { DoctorDetail } from "@/types/users";
import type { DocSpecialtyDetailDTO } from "@/types/doctor_clinic_specialty";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, CreditCard, Info } from "lucide-react";
import { useNavigate } from "react-router";

const DoctorBookingCard: React.FC<{ doctor: DocSpecialtyDetailDTO }> = ({
  doctor,
}) => {
  const navigateDetailDoctor = useNavigate();
  const handleEdit = async (id: number) => {
    if(!id){
      console.log("không thể chuyển trang detail doctor");
      return
    }
    navigateDetailDoctor(`/doctor/${id}`);
  };
  return (
    <Card className="mb-6 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row p-6 gap-6">
          {/* Cột trái: Ảnh và Liên kết */}
          <div className="flex flex-col items-center space-y-3 md:w-1/4">
            <Avatar className="w-28 h-28 border-2 border-primary/10 shadow-sm">
              <AvatarImage
                src={doctor.image || ""}
                alt="Doctor Avatar"
                className="object-cover"
              />
              <AvatarFallback className="bg-slate-100 text-slate-500 font-bold">
                {doctor.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
              onClick={() => handleEdit(doctor.id)}
            >
              Xem thêm chi tiết
            </Button>
          </div>

          {/* Cột phải: Thông tin chi tiết */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none px-2 py-0"
                >
                  {doctor.position?.value || "Bác sĩ"}
                </Badge>
              </div>
              <h3 className="text-xl font-bold text-slate-800 tracking-tight">
                {doctor.firstName} {doctor.lastName}
              </h3>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 italic">
              {doctor.doctorInfo?.note ||
                "Chuyên gia giàu kinh nghiệm trong lĩnh vực điều trị và tư vấn sức khỏe."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center text-slate-500 text-sm gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {doctor.doctorInfo?.provinceId?.value || "Toàn quốc"}
                </span>
              </div>
              <div className="flex items-center text-slate-500 text-sm gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-semibold text-slate-700">
                  Giá khám: {doctor.doctorInfo?.priceId?.value.toLocaleString()}{" "}
                  VNĐ
                </span>
              </div>
              <div className="flex items-center text-slate-500 text-sm gap-2">
                <CreditCard className="w-4 h-4 text-orange-500" />
                <span>Thanh toán: {doctor.doctorInfo?.paymentId?.value}</span>
              </div>
              <div className="flex items-center text-slate-500 text-sm gap-2">
                <Info className="w-4 h-4 text-blue-500" />
                <span className="text-xs">Hỗ trợ bảo hiểm y tế</span>
              </div>
            </div>
          </div>

          {/* Nút đặt lịch (Tùy chọn thêm) */}
          <div className="flex flex-col justify-center items-center md:border-l md:pl-6 gap-2">
            <Button
              className="w-full md:w-32 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-sm"
              onClick={() => handleEdit(doctor.id)}
              //  onClick={() => navigateDetailDoctor("/doctor/:id")}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorBookingCard;
