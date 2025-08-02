import { useEffect, useRef } from "react";
import pic1 from "@/assets/image/pic1.jpeg";
import pic2 from "@/assets/image/pic2.jpeg";
import pic3 from "@/assets/image/pic3.jpeg";
import pic4 from "@/assets/image/pic4.jpeg";

const images = [pic1, pic2, pic3, pic4];

const ImageScroll = () => {
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const scrollImages = () => {
      if (!scrollContainer) return;
      scrollAmount += 1;
      if (
        scrollAmount >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollAmount = 0;
      }
      scrollContainer.scrollTo({ left: scrollAmount, behavior: "smooth" });
    };

    const interval = setInterval(scrollImages, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-white">
      {/* Curved white overlay */}
      <div
        className="absolute top-0 left-0 w-full h-20 z-20 bg-white pointer-events-none"
        style={{
          clipPath: "ellipse(50% 70% at 50% 0%)",
          borderRadius: "0 0 50% 50%",
        }}
      />

      {/* Image scroller */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-8 overflow-x-auto scrollbar-hide relative z-10"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`img-${i}`}
            className="w-80 h-96 object-cover rounded-xl flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageScroll;
