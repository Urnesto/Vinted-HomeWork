import { useEffect, useRef } from "react";
import { IIntersectionObserverOptions } from "../types";

const useInfiniteScroll = (
  callback?: () => void,
  options?: IIntersectionObserverOptions
) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && callback) {
          callback();
        }
      }, options);

      observer.observe(observerRef.current);

      return () => observer.disconnect();
    }
  }, [observerRef]);

  return observerRef;
};

export default useInfiniteScroll;
