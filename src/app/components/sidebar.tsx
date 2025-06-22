"use client";

import { useRecentlyVisited } from "@/hooks/useRecentlyVisited";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Arrow,
  Container,
  Nav,
  RecentActions,
  RecentItem,
  RemoveButton,
  ScrollContainer,
  Section,
  StyledAnchor,
  Timestamp,
  Title,
} from "../styles/sidebar";
import { useScrollArrows } from "@/hooks/useScrollArrows";

type Doc = { slug: string; title: string };
type RecentVisit = { slug: string; visitedAt: number };

type SidebarProps = {
  docs: Doc[];
  currentSlug: string;
};

function formatTimeAgo(timestamp: number) {
  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "há alguns segundos";
  if (diffMinutes === 1) return "há 1 minuto";
  if (diffMinutes < 60) return `há ${diffMinutes} minutos`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return "há 1 hora";
  if (diffHours < 24) return `há ${diffHours} horas`;
  const diffDays = Math.floor(diffHours / 24);
  return diffDays === 1 ? "há 1 dia" : `há ${diffDays} dias`;
}

export function Sidebar({ docs, currentSlug }: SidebarProps) {
  const router = useRouter();

  const recentFromHook = useRecentlyVisited(currentSlug);
  const [recent, setRecent] = useState<RecentVisit[]>(recentFromHook);

  const recentDocs = recent
    .map(({ slug, visitedAt }) => {
      const doc = docs.find((d) => d.slug === slug);
      if (doc) return { ...doc, visitedAt };
      return null;
    })
    .filter(Boolean) as (Doc & { visitedAt: number })[];

  const scrollDocsRef = useRef<HTMLDivElement | null>(null);
  const scrollRecentRef = useRef<HTMLDivElement | null>(null);

  const docsItemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const recentItemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { atTop: docsAtTop, atBottom: docsAtBottom } = useScrollArrows(
    scrollDocsRef,
    docs.length
  );

  const { atTop: recentAtTop, atBottom: recentAtBottom } = useScrollArrows(
    scrollRecentRef,
    recentDocs.length
  );

  useEffect(() => {
    setRecent(recentFromHook);
  }, [recentFromHook]);

  const handleRemove = (slugToRemove: string) => {
    const filtered = recent.filter(({ slug }) => slug !== slugToRemove);
    setRecent(filtered);
    localStorage.setItem("recentlyVisited", JSON.stringify(filtered));
  };

  const scrollBy = (
    ref: React.RefObject<HTMLDivElement | null>,
    amount: number
  ) => {
    ref.current?.scrollBy({ top: amount, behavior: "smooth" });
  };

  const handleClickDoc = async (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number,
    slug: string
  ) => {
    e.preventDefault();
    const item = docsItemRefs.current[index];
    if (item && scrollDocsRef.current) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    await router.push(`/${slug}`);
  };

  const handleClickRecent = async (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number,
    slug: string
  ) => {
    e.preventDefault();
    const item = recentItemRefs.current[index];
    if (item && scrollRecentRef.current) {
      item.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    await router.push(`/${slug}`);
  };

  return (
    <Container>
      <Section>
        <Title style={{ marginTop: "40px" }}>Conteúdos</Title>
        <Arrow
          onClick={() => scrollBy(scrollDocsRef, -40)}
          disabled={docsAtTop}
          aria-label="Scroll up"
        >
          <ChevronUp size={16} />
        </Arrow>
        <ScrollContainer ref={scrollDocsRef}>
          <Nav aria-label="Menu principal">
            {docs.map(({ slug, title }, index) => (
              <StyledAnchor
                key={slug}
                aria-current={slug === currentSlug ? "page" : undefined}
                onClick={(e) => handleClickDoc(e, index, slug)}
                ref={(el) => {
                  docsItemRefs.current[index] = el ?? null;
                }}
              >
                {title}
              </StyledAnchor>
            ))}
          </Nav>
        </ScrollContainer>
        <Arrow
          onClick={() => scrollBy(scrollDocsRef, 40)}
          disabled={docsAtBottom}
          aria-label="Scroll down"
        >
          <ChevronDown size={16} />
        </Arrow>
      </Section>

      <Section>
        <Title>Visitados Recentemente</Title>
        {recentDocs.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>
            Nenhum conteúdo visitado ainda.
          </p>
        ) : (
          <>
            <Arrow
              onClick={() => scrollBy(scrollRecentRef, -40)}
              disabled={recentAtTop}
              aria-label="Scroll up"
            >
              <ChevronUp size={16} />
            </Arrow>
            <ScrollContainer ref={scrollRecentRef}>
              <Nav aria-label="Conteúdos visitados recentemente">
                {recentDocs.map(({ slug, title, visitedAt }, index) => (
                  <RecentItem key={slug}>
                    <StyledAnchor
                      aria-current={slug === currentSlug ? "page" : undefined}
                      onClick={(e) => handleClickRecent(e, index, slug)}
                      ref={(el) => {
                        recentItemRefs.current[index] = el ?? null;
                      }}
                    >
                      {title}
                    </StyledAnchor>

                    <RemoveButton
                      onClick={() => handleRemove(slug)}
                      aria-label={`Remover ${title} dos visitados recentemente`}
                    >
                      ×
                    </RemoveButton>

                    <RecentActions>
                      <Timestamp>{`Visitado ${formatTimeAgo(
                        visitedAt
                      )}`}</Timestamp>
                    </RecentActions>
                  </RecentItem>
                ))}
              </Nav>
            </ScrollContainer>
            <Arrow
              onClick={() => scrollBy(scrollRecentRef, 40)}
              disabled={recentAtBottom}
              aria-label="Scroll down"
            >
              <ChevronDown size={16} />
            </Arrow>
          </>
        )}
      </Section>
    </Container>
  );
}
