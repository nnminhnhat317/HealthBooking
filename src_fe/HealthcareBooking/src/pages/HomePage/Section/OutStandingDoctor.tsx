import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { FormattedMessage } from "react-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
// import { RootState } from "@/store";
// import { fetchTopDoctor } from "@/store/actions";
// import { LANGUAGES } from "@/utils";

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  positionData: {
    valueVi: string;
    valueEn: string;
  };
  img?: string;
}

export default function OutStandingDoctor() {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const language = useSelector((state: RootState) => state.app.language);
  //   const topDoctorsRedux = useSelector((state: RootState) => state.admin.topDoctors);

  const [doctors, setDoctors] = useState<Doctor[]>([
    // Dữ liệu giả lập để test khi chưa có API
    {
      id: 1,
      firstName: "Minh",
      lastName: "Nguyễn",
      positionData: { valueVi: "Bác sĩ", valueEn: "Doctor" },
      img: "https://via.placeholder.com/300x300?text=Doctor+1",
    },
    {
      id: 2,
      firstName: "Lan",
      lastName: "Trần",
      positionData: { valueVi: "Phó giáo sư", valueEn: "Associate Professor" },
      img: "https://via.placeholder.com/300x300?text=Doctor+2",
    },
    {
      id: 3,
      firstName: "John",
      lastName: "Smith",
      positionData: { valueVi: "Giáo sư", valueEn: "Professor" },
      img: "https://via.placeholder.com/300x300?text=Doctor+3",
    },
  ]);

  //   useEffect(() => {
  //     dispatch(fetchTopDoctor() as any);
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (topDoctorsRedux && topDoctorsRedux.length > 0) {
  //       setDoctors(topDoctorsRedux);
  //     }
  //   }, [topDoctorsRedux]);

  const handleViewDetailDoctor = (doctor: Doctor) => {
    navigate(`/detail-doctor/${doctor.id}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">
        {/* <FormattedMessage id="homepage.outstanding-doctor" defaultMessage="Bác sĩ nổi bật" /> */}
        Bác sĩ nổi bật
      </h2>

      <Carousel className="w-full">
        <CarouselContent>
          {doctors.map((item) => {
            const nameVi = `${item.positionData?.valueVi}, ${item.firstName} ${item.lastName}`;
            const nameEn = `${item.positionData?.valueEn}, ${item.lastName} ${item.firstName}`;
            const imageSrc =
              item.img || "https://via.placeholder.com/300x300?text=No+Image";

            return (
              <CarouselItem
                key={item.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
                onClick={() => handleViewDetailDoctor(item)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0 flex flex-col items-center">
                    <div className="w-full h-48 bg-gray-200">
                      <img
                        src={imageSrc}
                        alt={nameVi}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* <div className="p-3 text-center font-medium">
                      {language === LANGUAGES.VI ? nameVi : nameEn}
                    </div> */}
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
