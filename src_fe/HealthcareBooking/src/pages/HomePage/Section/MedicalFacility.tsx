import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

type Clinic = {
  id: number;
  name: string;
  image: string;
};

export default function MedicalFacility() {
  const navigate = useNavigate();
  const [clinics, setClinics] = React.useState<Clinic[]>([]);

  // Fake data (sau này bạn gọi API giống getAllClinic)
  React.useEffect(() => {
    const fakeData: Clinic[] = [
      {
        id: 1,
        name: "Phòng khám A",
        image: "https://via.placeholder.com/400x200",
      },
      {
        id: 2,
        name: "Phòng khám B",
        image: "https://via.placeholder.com/400x200",
      },
      {
        id: 3,
        name: "Phòng khám C",
        image: "https://via.placeholder.com/400x200",
      },
      {
        id: 3,
        name: "Phòng khám C",
        image: "https://via.placeholder.com/400x200",
      },
      {
        id: 3,
        name: "Phòng khám C",
        image: "https://via.placeholder.com/400x200",
      },
    ];
    setClinics(fakeData);
  }, []);

  const handleViewDetailClinic = (clinic: Clinic) => {
    navigate(`/detail-clinic/${clinic.id}`);
  };

  return (
    <div className="section-share section-medical-facility bg-gray-100 py-6">
      <div className="section-container max-w-6xl mx-auto">
        <div className="section-header flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Cơ sở y tế phổ biến</span>
        </div>

        <Carousel className="w-full">
          <CarouselContent>
            {clinics.map((item) => (
              <CarouselItem key={item.id} className="basis-1/3">
                <Card
                  onClick={() => handleViewDetailClinic(item)}
                  className="cursor-pointer overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div
                      className="h-40 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="p-2 text-center font-semibold">
                      {item.name}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
