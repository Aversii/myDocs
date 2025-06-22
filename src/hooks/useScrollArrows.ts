import { useState, useEffect } from "react";

export const useScrollArrows = (
  ref: React.RefObject<HTMLDivElement | null>,
  dependency: any = null
) => {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  const checkPosition = () => {
    const el = ref.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setAtTop(scrollTop <= 0);
    setAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    checkPosition();

    el.addEventListener("scroll", checkPosition);
    window.addEventListener("resize", checkPosition);

    return () => {
      el.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [ref, dependency]);

  return { atTop, atBottom };
};