import { useRef, useState, useEffect, useCallback } from "react";
import { card } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { getAssetPath } from "@/utils/paths";

const TestimonialSection = () => {
  const vdRef = useRef<HTMLVideoElement[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);



  // Show fewer cards on mobile to reduce memory usage
  const visibleCards = isMobile ? card.slice(0, 3) : card;

  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    // @ts-expect-error: ScrollTrigger is not properly typed on the gsap object
    gsap.ScrollTrigger.create({
      trigger: ".testimonials-section",
      start: "top 200%",
      onEnter: () => setIsVisible(true),
      once: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "150% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .sec-title",
        {
          xPercent: 25,
        },
        "<"
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<"
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "150% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  const handlePlay = useCallback((index: number) => {
    const video = vdRef.current[index];
    if (video && video.readyState >= 2) {
      video.play().catch(() => {});
    }
  }, []);

  const handlePause = useCallback((index: number) => {
    const video = vdRef.current[index];
    if (video) {
      video.pause();
    }
  }, []);

  // Toggle play/pause on tap for mobile
  const handleTap = useCallback((index: number) => {
    const video = vdRef.current[index];
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  return (
    <section className="testimonials-section" ref={sectionRef}>
      <div className="absolute size-full flex flex-col items-center justify-center z-20 pointer-events-none">
        <h1 className="text-black first-title">kumpulan</h1>
        <h1 className="text-light-brown sec-title">hewan</h1>
        <h1 className="text-black third-title" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.3)' }}>purba</h1>
      </div>

      <div className="pin-box">
        {visibleCards.map((cardItem, index) => (
          <div
            key={index}
            className={`vd-card ${cardItem.translation || ""} ${cardItem.rotation}`}
            onMouseEnter={() => handlePlay(index)}
            onMouseLeave={() => handlePause(index)}
            onClick={() => isMobile && handleTap(index)}
          >
            {isVisible ? (
              <video
                ref={(el) => {
                  if (el) vdRef.current[index] = el;
                }}
                src={getAssetPath(cardItem.src)}
                preload="metadata"
                playsInline
                muted
                loop
                className="size-full object-cover"
              />
            ) : (
              <div className="size-full bg-milk" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
