import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export const CarouselDemo = () => {
  return (
    <Carousel className="w-full max-w-md mx-auto">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-2">
                <span className="h1 font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export const CarouselDemoMultipleCards = () => {
  const slides = [
    { title: "Mountain View", description: "Scenic landscape" },
    { title: "Workspace", description: "Modern office setup" },
    { title: "Technology", description: "Digital innovation" },
    { title: "Ocean", description: "Coastal views" },
    { title: "City", description: "Urban nights" },
  ];

  return (
    <Carousel opts={{ align: "start" }} className="w-full">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem
            key={slide.title}
            className="basis-full sm:basis-1/2 md:basis-1/3"
          >
            <Card className="flex h-full min-h-13 flex-col">
              <CardHeader>
                <CardTitle>{slide.title}</CardTitle>
                <CardDescription>{slide.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 items-center justify-center">
                <p className="text-gray-12">Slide {index + 1}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};