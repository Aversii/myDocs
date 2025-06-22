import styled, { css, keyframes } from "styled-components";

export const StyledAnchor = styled.span<{ noMarker?: boolean; hideBefore?: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #666666;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s ease;

  &:hover,
  &:focus-visible {
    color: #f59e0b;
    outline: none;
  }

  &[aria-current="page"] {
    color: #fff !important;
    pointer-events: none;
    user-select: none;

    ${({ noMarker, hideBefore }) =>
      !noMarker &&
      !hideBefore &&
      css`
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 12px;
          bottom: 4px;
          width: 5px;
          background-color: #f59e0b;
          border-radius: 4px;
          height: 70%;
          box-shadow: 0 0 6px 2px rgba(245, 158, 11, 0.3);
        }
      `}
  }

  ${({ hideBefore }) =>
    hideBefore &&
    css`
      &:before {
        display: none !important;
      }
    `}
`;

export const Container = styled.aside`
  width: 300px;
  height: 100vh;
  background-color: #121212;
  padding: 32px 20px;
  color: #d1d5db;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-family: "Inter", sans-serif;
  box-shadow: inset -1px 0 0 #333;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.02em;
`;

export const Section = styled.section`
  flex: 1;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 1.15rem;
  margin-bottom: 1rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ScrollContainer = styled.div`
  max-height: 220px;
  overflow-y: auto;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Arrow = styled.div<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ disabled }) => (disabled ? "#555" : "#d1d5db")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  transition: color 0.2s;

  &:hover {
    color: ${({ disabled }) => (disabled ? "#555" : "#f59e0b")};
  }
`;

const removeAnimation = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
    height: auto;
    margin-top: 6px;
    margin-bottom: 6px;
    padding-top: 6px;
    padding-bottom: 6px;
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
    height: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const RecentItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 6px 12px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  color: #d1d5db;
  font-size: 0.8rem;
  font-weight: 300;
  user-select: none;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);



  span {
    color: #d1d5db;
    text-decoration: none;
    font-weight: 400;
    transition: color 0.3s ease;
    padding-left: 5px;

    &:hover {
      color: #f59e0b;
    }
        &:before {
        display: none !important;
      }    

  }

  &:last-child {
    border-bottom: none;
  }

  &.removing {
    animation: ${removeAnimation} 350ms forwards ease;
    pointer-events: none;
  }
`;

export const RecentActions = styled.div`
  position: relative;
  width: 100%;
  margin-top: 4px;
`;

export const Timestamp = styled.span`
  display: block;
  width: 100%;
  color: #6b7280;
  font-size: 0.7rem;
  font-weight: 400;
  text-align: left;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 3px;
  background: transparent;
  border: none;
  color: #d1d5db;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0 6px;
  opacity: 0;
  transition: opacity 0.15s ease;
  user-select: none;

  &:hover {
    color: #f59e0b;
  }

  ${RecentItem}:hover & {
    opacity: 1;
  }
`;
