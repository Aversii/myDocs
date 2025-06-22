import styled from "styled-components";

//==================================
// TOC Session
//==================================

export const TocNav = styled.nav`
  position: fixed;
  top: 80px;
  padding: 1.5rem;
  width: 320px;
  border-left: 1px solid #444;
  color: #cf7d25;
  font-size: 0.9rem;
  max-height: calc(100vh - 80px);
  overflow-y: hidden;
`;

export const TocList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
`;

export const TocItem = styled.li<{ $level: number; $isFirst: boolean }>`
  margin-left: ${(props) => (props.$level - 1) * 16}px;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: ${(props) => (props.$isFirst ? "0px" : "20px")};
`;

export const TocLine = styled.div<{ $showLine: boolean }>`
  position: absolute;
  left: 5px;
  top: 14px;
  bottom: ${(props) => (props.$showLine ? "-22px" : "14px")};
  width: 2px;
  background-color: #555;
`;

export const TocDiamond = styled.div<{ $active: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border: 2px solid ${(props) => (props.$active ? "#e0a959" : "#cf7d25")};
  background-color: ${(props) => (props.$active ? "#e0a959" : "transparent")};
  transform: rotate(45deg);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

export const TocLink = styled.a<{ $active: boolean; $level: number }>`
  color: ${(props) => (props.$active ? "#e0a959" : "#e0e0e0")};
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-weight: ${(props) => (props.$level === 1 ? "bold" : "normal")};

  &:hover {
    color: #e0a959;
  }
`;
