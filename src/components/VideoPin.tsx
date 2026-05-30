import { getAssetPath } from "@/utils/paths";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const VideoPinSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load video only when section is near viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "-15% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });
    });
  });

  return (
    <section className="vd-pin-section" ref={sectionRef}>
      <div className="size-full video-box max-md:[clip-path:circle(100%_at_50%_50%)] md:[clip-path:circle(6%_at_50%_50%)]">
        {isVisible ? (
          <video src={getAssetPath("/videos/20260510_232032.mp4")} preload="none" playsInline muted loop autoPlay className="size-full object-cover" />
        ) : (
          <div className="size-full bg-black" />
        )}

        <div className="abs-center md:scale-100 scale-200">
          <Image src={getAssetPath("/images/circle-text.svg")} alt="" width={500} height={500} className="spin-circle" />
          <div className="play-btn">
            <Image src={getAssetPath("/images/play.svg")} alt="" width={500} height={500} className="size-[3vw] ml-[.5vw]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
