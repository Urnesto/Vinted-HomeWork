import { useEffect, useRef, useState } from "react";

const useLazyLoadImage = (
  baseImgUrl: string,
  imageSizes: { suffix: string; width: number }[]
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imageSizes.length > 0) {
      const handleLoad = () => {
        setIsLoaded(true);
      };

      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          imgRef.current!.src = selectBestImageSrc(baseImgUrl, imageSizes);
          observer.disconnect();
        }
      });

      observer.observe(imgRef.current);
      imgRef.current!.addEventListener("load", handleLoad);

      return () => {
        imgRef.current!.removeEventListener("load", handleLoad);
        observer.disconnect();
      };
    }
  }, [baseImgUrl, imageSizes]);

  const selectBestImageSrc = (
    baseImgUrl: string,
    imageSizes: { suffix: string; width: number }[]
  ) => {
    const width = window.innerWidth;
    const bestSize =
      imageSizes.find((size) => width <= size.width) ||
      imageSizes[imageSizes.length - 1];
    return `${baseImgUrl}${bestSize.suffix}.jpg`;
  };

  return { imgRef, isLoaded };
};

export default useLazyLoadImage;
