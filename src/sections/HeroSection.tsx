import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect } from "react";

interface HeroSectionProps {
  onLoaded: () => void;
  triggerAnimation: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoaded, triggerAnimation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("HeroSection: Safety timeout triggered");
      onLoaded();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  useGSAP(
    () => {
      if (!triggerAnimation) return;

      const titleSplit = SplitText.create(".hero-title", {
        type: "chars",
      });

    const tl = gsap.timeline();

      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
      })
        .to(
          ".hero-text-scroll",
          {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.out",
          },
          "-=0.5"
        )
        .from(
          titleSplit.chars,
          {
            yPercent: 200,
            stagger: 0.02,
            ease: "power2.out",
          },
          "-=0.5"
        );

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "1% top",
          end: "bottom top",
          scrub: true,
        },
      });
      heroTl.to(".hero-container", {
        rotate: 7,
        scale: 0.9,
        yPercent: 30,
        ease: "power1.inOut",
      });
    },
    { dependencies: [triggerAnimation] }
  );

  return (
    <section className="bg-main-bg">
      <div className="hero-container !bg-[#2c1003]">
        {/* Ambient Blurred Background for Desktop */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/images/hero-bg-custom.jpg"
            alt="hero-bg-ambient"
            fill
            quality={10}
            unoptimized
            priority
            className="object-cover blur-[80px] opacity-60 scale-110"
          />
        </div>

        {/* Main Sharp Image */}
        <Image
          src="/images/hero-bg-custom.jpg"
          alt="hero-bg"
          fill
          quality={100}
          unoptimized
          priority
          className="md:object-contain object-cover relative z-[1]"
          onLoad={() => {
            console.log("HeroSection: Custom BG loaded");
            onLoaded();
          }}
        />
        <div className="hero-content opacity-0 relative z-10">
          <div className="overflow-hidden">
            <h1 className="hero-title">susu sapi qurban</h1>
          </div>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >
            <div className="hero-subtitle">
              <h1>rendah kalori enak </h1>
            </div>
          </div>
          <h2 className="bg-white/70 backdrop-blur-md py-2 px-6 rounded-full shadow-xl border border-white/50">
            ini susu enak parah mending lu cobain dah
          </h2>
          <a href="https://www.ultrajaya.co.id/products/ultra-milk-full-Cream/ind" target="_blank" rel="noopener noreferrer" className="hero-button inline-block hover:scale-105 transition-transform cursor-pointer">
            <p>ultra milk</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
