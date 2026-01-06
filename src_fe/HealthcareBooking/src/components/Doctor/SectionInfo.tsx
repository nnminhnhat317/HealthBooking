import { Calendar22 } from "@/components/General/DatePicker";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Schedule } from "@/types/schedule";
import { getScheduleByDateApi } from "@/api/schedule";
import { getUsersIdAp } from "@/api/users";
import { getDoctorMarkdownApi } from "@/api/markdown";
import { TestPage } from "@/pages/TestPage";
import type { DoctorDetail } from "@/types/users";
export const SectionInfo: React.FC = () => {
  // const doctor = {
  //   id: 1,
  //   name: "PGS.TS. Bác sĩ Trần Minh Hòa",
  //   avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  //   position: "Trưởng Khoa Nội thần kinh – Bệnh viện Đại học Y",
  //   university: "Giảng viên cao cấp Đại học Y Hà Nội",
  //   ageRange: "Khám cho người bệnh từ 12 tuổi trở lên",
  //   location: "Hà Nội",
  //   scheduleDate: "Thứ 4 - 10/12",
  //   timeSlots: [
  //     "14:30 - 15:30",
  //     "15:30 - 16:30",
  //     "16:00 - 17:00",
  //     "17:00 - 18:00",
  //   ],
  //   clinic: {
  //     name: "Phòng khám Đa khoa Meditec",
  //     address: "Số 52 Bà Triệu, Hoàn Kiếm, Hà Nội",
  //   },
  //   price: 500000,
  //   insurance: "Có hỗ trợ",
  // };
  
  // Đoạn code lấy ID từ URL với useParam khi navigate lấy thông tin nhân viên tại vị trí đó lưu
  //vào useState doctorId
  const { id } = useParams(); // lấy id từ URL
  const convertIdfromUseParam = (id: string | undefined) => {
    const numericId = Number(id); //chuyển kiểu string|undefined sang number
    return numericId;
  };
  // const today = new Date().toISOString().split("T")[0];
  // const doctorId = convertIdfromUseParam(id);
  const doctorId = Number(7); // hard code tạm thời
  // const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [doctorDetail, setDoctorDetail] = useState<DoctorDetail>();

  const fetchDoctorDate = async (doctorId: number, date: Date) => {
    try {
      const data = await getScheduleByDateApi(doctorId, date); // gọi 1 api lấy lịch khám theo doctorId và date
      setSchedules(data);
      // console.log("data schedule by date", data);
      const data2 = await getUsersIdAp(doctorId);
      console.log("data DoctorDetail", data2);
      setDoctorDetail(data2);
    } catch (error) {
      console.error(
        "Lỗi khi tải dữ liệu tại component Doctor SectionInfo:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDoctorDate(doctorId, selectedDate);
  }, [doctorId, selectedDate]);
  // Các useState lưu mảng allPrices, allProvinces, allPayments
  // const [provinces, setAllProvinces] = useState<
  //   { keyMap: string; value: string }[]
  // >([]);
  // const [payments, setAllPayments] = useState<
  //   { keyMap: string; value: string }[]
  // >([]);
  // Gọi api lấy allPrices, allProvinces, allPayments
  //   useEffect(() => {
  //   const fetchData = async () => {
  //     const prices = await fetchAllPrices();
  //     const provinces = await fetchAllProvinces();
  //     const payments = await fetchAllPayments();

  //     setAllPrices(prices);
  //     setAllProvinces(provinces);
  //     setAllPayments(payments);
  //   };

  //   fetchData();
  // }, []);

  // Tạo object map mới với cấu trúc key:value (key_map:value) từ mảng api đã gọi (price,province,payment) để truy cập nhanh
  // const provinceMap = provinces.reduce((acc, p) => {
  //   acc[p.keyMap] = p.value;
  //   return acc;
  // }, {});
  // const paymentMap = payments.reduce((acc, p) => {
  //   acc[p.keyMap] = p.value;
  //   return acc;
  // }, {});
  // Sử dụng trong JSX
  // provinceMap[doctorInfor.provinceId]
  // paymentMap[doctorInfor.paymentId]
  //
  const handleChildValueChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Tải dữ liệu lịch khám theo ngày:", date);
  };

  return (
    <div>
      {/* <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"> */}
      <div className="">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={`http://localhost:8080${doctorDetail?.image}`}
              className="w-32 h-32 rounded-full object-cover shadow"
              alt="avatar"
            />
            {/* <TestPage/> */}
          </div>

          {/* Info */}
          <div className="flex-grow space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {doctorDetail?.firstName} {doctorDetail?.lastName}
            </h1>
            <p className="text-gray-600">{doctorDetail?.position.value}</p>
            {/* <p className="text-gray-600">{doctor.university}</p> */}
            {/* <p className="text-gray-600">
              <span className="font-semibold">Chuyên khám:</span>{" "}
              {doctor.ageRange}
            </p> */}
            <p className="flex items-center gap-1 text-gray-700">
              {/* {doctorDetail?.doctorInfor?.paymentId?.value} */}
              <span className="font-semibold">
                Phương thức thanh toán:
              </span>{" "}
              {doctorDetail?.doctorInfor?.paymentId.value}
            </p>

            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Chia sẻ
            </button> */}
          </div>
        </div>

        <hr className="my-6" />

        {/* LỊCH KHÁM */}
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          {/* Lịch khám - {doctor.scheduleDate} */}
          Lịch khám
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* {doctor.timeSlots.map((slot, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-3 text-center hover:bg-blue-50 cursor-pointer"
              >
              {slot}
            </div>
          ))} */}
          {schedules.map((item, id) => (
            <div
              key={id}
              className="border rounded-lg p-3 text-center hover:bg-blue-50 cursor-pointer"
            >
              {item.time?.value}
            </div>
          ))}
        </div>

        {/* <p className="mt-3 text-sm text-red-600">
          * Đây chỉ là thời gian dự kiến. Phòng khám sẽ liên hệ để xác nhận.
        </p> */}
        <p className="mb-2 text-sm">* Chọn ngày khám</p>
        <Calendar22 onDateTimeChange={handleChildValueChange} />
        <hr className="my-6" />

        {/* ĐỊA CHỈ */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Địa chỉ khám</h3>

          <div className="text-gray-700">
            {/* <span className="font-semibold">{doctorDetail?.clinics?.[0]?.clinicName}</span> */}
            {doctorDetail?.clinics && doctorDetail.clinics.length > 0 ? ( // thực hiện logic duyệt nhiều clinics nhưng trong project này thì vô nghĩa vì chỉ 1doctor-1clinic
              doctorDetail.clinics.map((item, index) => (
                <span key={index}>
                  <p className="font-semibold">{item.clinicName}</p>
                  {item.clinicAddress}
                  {index < doctorDetail.clinics.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>Chưa có thông tin phòng khám</span>
            )}
          </div>

          <p className="text-gray-700">
            <span className="font-semibold">Giá khám:</span>{" "}
            {/* {doctor.price.toLocaleString()}đ */}
            {doctorDetail?.doctorInfor?.priceId.value}đ
          </p>

          {/* <p className="text-gray-700">
            <span className="font-semibold">Bảo hiểm áp dụng:</span>{" "}
            {doctor.insurance}
          </p> */}
        </div>
      </div>
    </div>
  );
};
