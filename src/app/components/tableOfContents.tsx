"use client";

import { useEffect, useState, useRef } from "react";
import debounce from "lodash.debounce";
import {
  TocNav,
  TocList,
  TocItem,
  TocLine,
  TocDiamond,
  TocLink,
} from "../styles/tableOfContent";

type Heading = {
  id: string;
  level: number;
  text: string;
};

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[!\"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~]/g, "");
}

export function TableOfContents({ toc }: { toc: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id || "");
  const offset = 80;
  const clickedIdRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = debounce(() => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight - scrollBottom < 100) {
        if (clickedIdRef.current) {
          setActiveId(clickedIdRef.current);
        } else {
          setActiveId(toc[toc.length - 1]?.id || "");
        }
        return;
      }

      let currentActive = toc[0]?.id || "";
      for (const { id } of toc) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          currentActive = id;
        } else {
          break;
        }
      }

      setActiveId(currentActive);
    }, 100);

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      onScroll.cancel();
    };
  }, [toc]);

  const handleClick = (id: string) => {
    clickedIdRef.current = id;
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - offset,
      behavior: "smooth",
    });

    setActiveId(id);
  };

  return (
    <TocNav aria-label="Table of contents">
      <TocList>
        {toc.map((item, index) => {
          const next = toc[index + 1];
          const showLine = next && next.level === item.level;
          const isFirstItem = index === 0;

          const headingId = slugifyHeading(item.id);

          return (
            <TocItem key={headingId} $level={item.level} $isFirst={isFirstItem}>
              {!isFirstItem && <TocLine $showLine={!!showLine} />}
              {!isFirstItem && <TocDiamond $active={activeId === headingId} />}
              <TocLink
                href={`#${headingId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(headingId);
                }}
                $active={activeId === headingId}
                $level={item.level}
              >
                {item.text}
              </TocLink>
            </TocItem>
          );
        })}
      </TocList>
    </TocNav>
  );
}
