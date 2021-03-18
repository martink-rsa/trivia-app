import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Variables */
  html {
    --color-primary: #51B6FE;
    --color-secondary: #ff00ff;
    --color-text-body: #39496a;
  }
  #root {
    height: 100vh;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    color: var(--color-text-body);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6 {
    text-align: center;
  }

  button {
    cursor: pointer;
  }

  .rotate-cw-90 {
    transform: rotate(90deg);
  }
  .rotate-cw-90 {
    transform: rotate(180deg);
  }
  .rotate-ccw-90 {
    transform: rotate(-90deg);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
