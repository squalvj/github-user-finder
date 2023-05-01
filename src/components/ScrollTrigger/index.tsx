import { FC, useEffect, useRef, ReactNode } from "react";

interface ScrollTriggerProps {
  onTrigger: () => void;
  children: ReactNode;
}

const ScrollTrigger: FC<ScrollTriggerProps> = ({ onTrigger, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const bottomOfPage = scrollTop + clientHeight >= scrollHeight;
        if (bottomOfPage) {
          onTrigger();
        }
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onTrigger]);

  return (
    <div
      ref={ref}
      className="overflow-y-auto min-h-[calc(100vh-200px)] max-h-[calc(100vh-200px)] sm:min-h-[500px] sm:max-h-[500px]"
    >
      {children}
    </div>
  );
};

export default ScrollTrigger;
