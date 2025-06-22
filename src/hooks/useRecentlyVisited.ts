import { useState, useEffect } from "react";

export type RecentVisit = {
  slug: string;
  visitedAt: number;
};

export function useRecentlyVisited(currentSlug: string) {
  const [recent, setRecent] = useState<RecentVisit[]>([]);

  useEffect(() => {
    if (!currentSlug) return;

    const stored = localStorage.getItem("recentlyVisited");
    let recentArray: RecentVisit[] = stored ? JSON.parse(stored) : [];

    recentArray = recentArray.filter((item) => item.slug !== currentSlug);

    recentArray.unshift({ slug: currentSlug, visitedAt: Date.now() });

    if (recentArray.length > 10) {
      recentArray = recentArray.slice(0, 10);
    }

    localStorage.setItem("recentlyVisited", JSON.stringify(recentArray));
    setRecent(recentArray);
  }, [currentSlug]);

  return recent;
}
