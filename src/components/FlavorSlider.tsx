import { getAssetPath } from "@/utils/paths";
import { useGSAP } from "@gsap/react";
import { flavorList } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

const FlavorSlider = () => {
  const sliderRef = useRef<null | HTMLDivElement>(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const section = document.querySelector('.flavor-section');
    const scrollAmount = (section?.scrollWidth || 0) - window.innerWidth;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount}px`,
          scrub: true,
          pin: true,
          snap: 1 / (flavorList.length - 1),
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        ".second-text-split",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorList.map((flavor) => (
          <div key={flavor.name} className={`relative z-30 lg:w-[50vw] w-96 lg:h-[70vh] md:w-[90vw] md:h-[50vh] h-80 flex-none ${flavor.rotation} flex justify-center items-center`}>
            {flavor.isCustom ? (
              <Image src={getAssetPath(`/images/${flavor.imgSrc}`)} alt="flavor" width={1000} height={1000} quality={100} unoptimized className="size-full object-cover rounded-[2vw] shadow-2xl" />
            ) : (
              <>
                <Image src={getAssetPath(`/images/${flavor.color}-bg.svg`)} alt="flavor" width={1000} height={1000} className="absolute bottom-0" />
                <Image src={getAssetPath(`/images/${flavor.color}-drink.webp`)} alt="flavor" width={455} height={455} className="drinks w-64 md:w-[455px]" />
                <Image src={getAssetPath(`/images/${flavor.color}-elements.webp`)} alt="flavor" width={500} height={500} className="elements" />
                <h1>{flavor.name}</h1>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
