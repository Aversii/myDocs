import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    display: flex;
    background-color: #191919;
    color: #ccc;
    font-family: 'Segoe UI', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4 {
    scroll-margin-top: 100px;
  }

  pre {
    background: #1e1e1e;
    color: #00ffea;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
`
