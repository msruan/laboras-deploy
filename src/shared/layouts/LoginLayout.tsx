import { Link, Outlet } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

import img1 from "./../..//assets/img1.svg";
import img2 from "./../../assets/img2.svg";
import img3 from "./../../assets/img3.svg";
import img4 from "./../../assets/img4.svg";
import img5 from "@/assets/img5.svg";

export const LoginLayout = () => {
  type MyCarouselItemProps = {
    img: string;
  };

  function MyCarouselItem({ img }: MyCarouselItemProps) {
    return (
      <CarouselItem>
        <div className="flex aspect-square bg-background rounded p-8">
          <img src={img} alt="" />
        </div>
      </CarouselItem>
    );
  }

  return (
    <main className=" h-screen  flex justify-center items-center  w-full">
      <div className="bg-card w-full h-full md:flex justify-center items-center p-16 max-sm:hidden">
        <Carousel
          className="w-full max-w-xl"
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            <MyCarouselItem img={img1} />
            <MyCarouselItem img={img2} />
            <MyCarouselItem img={img3} />
            <MyCarouselItem img={img4} />
            <MyCarouselItem img={img5} />
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
        <Outlet />
      </section>
    </main>
  );
};
