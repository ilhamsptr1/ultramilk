import Image from "next/image";
import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <footer className="footer-section">
      <Image src="/images/footer-dip.webp" alt="" width={3000} height={3000} className="w-full object-cover -translate-y-1" />

      <div className="min-h-[140dvh] relative flex flex-col pb-7">
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full overflow-hidden">
          <h1 className="text-5xl md:text-7xl 2xl:text-[7rem] font-bold uppercase tracking-tighter text-center text-black py-5">#ULTRAMILK</h1>
        </div>

        {isMobile ? (
          <Image src="/images/footer-drink.webp" alt="" width={3000} height={3000} className="absolute top-0 object-contain z-0" />
        ) : (
          <video src="/videos/splash1.mp4" autoPlay playsInline muted loop className="absolute top-0 left-0 w-full h-full object-cover mix-blend-lighten z-0" />
        )}


        <div className="mt-auto relative z-10 flex flex-col w-full md:px-10 px-5 mb-7 gap-5">
          <div className="flex md:flex-row flex-col justify-between items-end w-full gap-5 md:gap-10">
            <div className="flex justify-start gap-5 w-full">
              <a href="https://github.com/ilhamsptr1" target="_blank" rel="noopener noreferrer" className="social-btn">
                <Image src="/images/github.svg" alt="GitHub" width={50} height={50} />
              </a>
              <a href="https://www.instagram.com/ilhammsptra_/" target="_blank" rel="noopener noreferrer" className="social-btn">
                <Image src="/images/insta.svg" alt="Instagram" width={50} height={50} />
              </a>
              <a href="https://www.tiktok.com/@ninetofive925" target="_blank" rel="noopener noreferrer" className="social-btn">
                <Image src="/images/tiktok.svg" alt="TikTok" width={50} height={50} />
              </a>
            </div>

            <div className="md:max-w-lg w-full text-milk drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-paragraph font-bold">
              <p className="text-xl">Dapatkan Akses Awal Eksklusif dan Jadilah yang Pertama Tahu Tentang Info Produk, Acara, dan Lainnya!</p>
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse justify-between items-end w-full gap-5 md:gap-10">
            <div className="w-full text-milk drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-lg font-paragraph font-bold text-left mb-2">
              <p>Copyright © 2026 Ilham Saputra</p>
            </div>
            
            <div className="md:max-w-lg w-full text-milk drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-paragraph font-bold">
              <a href="https://wa.me/62895324017432" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center border-b-2 border-milk pb-2 group cursor-pointer w-full">
                <span className="bg-transparent text-milk font-sans font-bold drop-shadow-md text-2xl md:text-3xl opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">Hubungi WhatsApp</span>
                <Image src="/images/whatsapp.svg" alt="WhatsApp" width={60} height={60} className="drop-shadow-lg group-hover:scale-110 transition-transform object-contain" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
