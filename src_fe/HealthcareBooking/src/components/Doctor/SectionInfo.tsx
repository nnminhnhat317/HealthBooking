export const SectionInfo: React.FC = () => {
  const doctor = {
    id: 1,
    name: "PGS.TS. Bác sĩ Trần Minh Hòa",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    position: "Trưởng Khoa Nội thần kinh – Bệnh viện Đại học Y",
    university: "Giảng viên cao cấp Đại học Y Hà Nội",
    ageRange: "Khám cho người bệnh từ 12 tuổi trở lên",
    location: "Hà Nội",
    scheduleDate: "Thứ 4 - 10/12",
    timeSlots: [
      "14:30 - 15:30",
      "15:30 - 16:30",
      "16:00 - 17:00",
      "17:00 - 18:00",
    ],
    clinic: {
      name: "Phòng khám Đa khoa Meditec",
      address: "Số 52 Bà Triệu, Hoàn Kiếm, Hà Nội",
    },
    price: 500000,
    insurance: "Có hỗ trợ",
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={doctor.avatar}
              className="w-32 h-32 rounded-full object-cover shadow"
              alt="avatar"
            />
          </div>

          {/* Info */}
          <div className="flex-grow space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>

            <p className="text-gray-600">{doctor.position}</p>
            <p className="text-gray-600">{doctor.university}</p>
            <p className="text-gray-600">
              <span className="font-semibold">Chuyên khám:</span>{" "}
              {doctor.ageRange}
            </p>

            <p className="flex items-center gap-1 text-gray-700">
              <span>📍</span> {doctor.location}
            </p>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Chia sẻ
            </button>
          </div>
        </div>

        <hr className="my-6" />

        {/* LỊCH KHÁM */}
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          Lịch khám – {doctor.scheduleDate}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {doctor.timeSlots.map((slot, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-3 text-center hover:bg-blue-50 cursor-pointer"
            >
              {slot}
            </div>
          ))}
        </div>

        <p className="mt-3 text-sm text-red-600">
          * Đây chỉ là thời gian dự kiến. Phòng khám sẽ liên hệ để xác nhận.
        </p>

        <hr className="my-6" />

        {/* ĐỊA CHỈ */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Địa chỉ khám</h3>

          <p className="text-gray-700">
            <span className="font-semibold">{doctor.clinic.name}</span>
            <br />
            {doctor.clinic.address}
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Giá khám:</span>{" "}
            {doctor.price.toLocaleString()}đ
          </p>

          <p className="text-gray-700">
            <span className="font-semibold">Bảo hiểm áp dụng:</span>{" "}
            {doctor.insurance}
          </p>
        </div>
      </div>
    </div>
  );
};
