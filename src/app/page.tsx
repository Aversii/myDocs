"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Animações
const glow = keyframes`
  0%, 100% {
    text-shadow:
      0 0 8px #cf7d25,
      0 0 20px #cf7d25,
      0 0 30px #cf7d25,
      0 0 40px #cf7d25,
      0 0 50px #cf7d25;
    color: #f5a623;
  }
  50% {
    text-shadow:
      0 0 15px #cf7d25,
      0 0 30px #cf7d25,
      0 0 45px #cf7d25,
      0 0 60px #cf7d25,
      0 0 75px #cf7d25;
    color: #ffb84d;
  }
`;

const dots = keyframes`
  0% { content: ""; }
  33% { content: "."; }
  66% { content: ".."; }
  100% { content: "..."; }
`;

const loadingDots = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
`;

const SplashWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  animation: ${glow} 3s ease-in-out infinite;
  user-select: none;
`;

const LoadingText = styled.div`
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #cf7d25;
  letter-spacing: 0.15em;
  display: flex;
  align-items: center;
  font-family: monospace;
`;

const Dot = styled.span<{ delay: number }>`
  animation: ${loadingDots} 1.4s infinite;
  animation-delay: ${({ delay }) => delay}s;
  margin-left: 4px;
  font-weight: 900;
  font-size: 1.7rem;
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  width: 60%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background: #cf7d25;
  width: ${({ progress }) => progress}%;
  transition: width 0.1s linear;
  border-radius: 10px;
  box-shadow:
    0 0 8px #cf7d25,
    0 0 15px #cf7d25,
    0 0 20px #cf7d25;
`;

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 5000; // 5 segundos

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        router.push("/iniciando-um-projeto-spring-boot");
      }
    };

    requestAnimationFrame(step);

    return () => {
      // cleanup se desmontar antes
      setProgress(0);
    };
  }, [router]);

  return (
    <SplashWrapper>
      <Title>My Docs</Title>
      <LoadingText>
        <Dot delay={0}>.</Dot>
        <Dot delay={0.3}>.</Dot>
        <Dot delay={0.6}>.</Dot>
      </LoadingText>
      <ProgressBarWrapper>
        <Progress progress={progress} />
      </ProgressBarWrapper>
    </SplashWrapper>
  );
}
