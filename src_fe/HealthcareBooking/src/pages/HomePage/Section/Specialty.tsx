import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { FormattedMessage } from "react-intl";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

// API service
// import { getAllSpecialty } from "../../../services/userService";

// Types
type SpecialtyItem = {
  id: string | number;
  name: string;
  img: string;
};

export default function Specialty() {
    const [items] = useState<SpecialtyItem[]>([
    {
      id: 1,
      name: "Chuyên khoa Tim mạch",
      img: "https://via.placeholder.com/300x200?text=Tim+m%E1%BA%A1ch",
    },
    {
      id: 2,
      name: "Chuyên khoa Thần kinh",
      img: "https://via.placeholder.com/300x200?text=Th%E1%BA%A7n+kinh",
    },
    {
      id: 3,
      name: "Chuyên khoa Tai - Mũi - Họng",
      img: "https://via.placeholder.com/300x200?text=Tai+-+M%C5%A9i+-+H%E1%BB%8Dng",
    },
    {
      id: 4,
      name: "Chuyên khoa Da liễu",
      img: "https://via.placeholder.com/300x200?text=Da+li%E1%BB%85u",
    },
    {
      id: 5,
      name: "Chuyên khoa Nhi",
      img: "https://via.placeholder.com/300x200?text=Nhi",
    },
  ]);
  const navigate = useNavigate();
  // const [items, setItems] = useState<SpecialtyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    // call API
//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         const res = await getAllSpecialty();
//         if (mounted) {
//           if (res && res.errCode === 0 && Array.isArray(res.data)) {
//             setItems(res.data as SpecialtyItem[]);
//           } else {
//             setError("Failed to load specialties");
//           }
//         }
//       } catch (e) {
//         if (mounted) setError("Something went wrong");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, []);

  const handleClick = (item: SpecialtyItem) => {
    navigate(`/detail-specialty/${item.id}`);
  };

  return (
    <div className="w-full bg-gray-100 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {/* <FormattedMessage id="homepage.specialty-popular" defaultMessage="Popular specialties" /> */}
            Chuyên khoa phổ biến
          </h2>
          {/* You can re-enable a "More" button if needed */}
          {/* <Button variant="secondary" size="sm">
            <FormattedMessage id="homepage.more-infor" defaultMessage="More info" />
          </Button> */}
        </div>

        <div>
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <Carousel opts={{ align: "start", loop: false }} className="w-full">
            <CarouselContent>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <Card className="rounded-2xl shadow-sm">
                        <CardContent className="p-3">
                          <Skeleton className="h-40 w-full rounded-xl" />
                          <Skeleton className="mt-3 h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))
                : items.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <Card
                        className="group cursor-pointer rounded-2xl shadow-sm transition-shadow hover:shadow-md"
                        onClick={() => handleClick(item)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") handleClick(item);
                        }}
                        aria-label={item.name}
                      >
                        <CardContent className="p-3">
                          <div
                            className="h-40 w-full rounded-xl bg-muted bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.img})` }}
                          />
                          <div className="mt-3 line-clamp-1 text-sm font-medium">
                            {item.name}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3" />
            <CarouselNext className="-right-3" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
