import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

// type LazyImageProps = {
//   src: string;
//   alt: string;
// };
// type ImageNative = ImgHTMLAttributes<HTMLImageElement>;
// type Props = LazyImageProps & ImageNative;
interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  onLazyLoad?: (img: HTMLImageElement) => void;
}

export const LazyImage = ({
  src,
  alt,
  onLazyLoad,
  ...imgProps
}: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [isLazyLoaded, setIsLazyLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  useEffect(() => {
    if (isLazyLoaded) {
      return;
    }
    // nuevo observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // onIntersection -> console.log
        if (!entry.isIntersecting || !node.current) {
          return;
          // console.log("Hey you!");
        }

        setCurrentSrc(src);
        observer.disconnect();
        setIsLazyLoaded(true);

        if (typeof onLazyLoad === "function") {
          onLazyLoad(node.current);
        }
      });
    });

    // observe node
    if (node.current) {
      observer.observe(node.current);
    }

    // desconectar
    return () => observer.disconnect();
  }, [src, onLazyLoad, isLazyLoaded]);

  return <img ref={node} src={currentSrc} {...imgProps} />;
};
