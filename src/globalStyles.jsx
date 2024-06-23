import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    color: #333;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 1rem 0;
  }

  p {
    margin: 0.5rem 0;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    background: #232f3e;
    color: white;
    cursor: pointer;
    &:hover {
      background: #1d2530;
    }
  }
`;

export default GlobalStyle;
