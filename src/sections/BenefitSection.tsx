import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoPin from "@/components/VideoPin";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl.from(".benefit-section .benefit-desc", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">

          <div className="mt-10 md:mt-20 max-w-4xl text-center px-4">
            <p className="benefit-desc text-xl md:text-3xl font-paragraph text-balance leading-relaxed">
              Ultra Milk adalah susu cair UHT (Ultra High Temperature) dari PT Ultrajaya Milk Industry Tbk yang dibuat dari 100% susu sapi segar. Diproses dengan suhu tinggi untuk membunuh bakteri dan dikemas secara higienis, sehingga tahan lama tanpa menggunakan bahan pengawet.
            </p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPin />
      </div>
    </section>
  );
};

export default BenefitSection;
