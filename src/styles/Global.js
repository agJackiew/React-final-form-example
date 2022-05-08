import { createGlobalStyle } from 'styled-components';
import food from '../assets/food3.png';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato+Sans+JP:wght@100;200;300;400;700&display=swap');

  :root {
    --color-x-dark: #D9DD6B;
    --color-x-light: #ECEFA4;
    --color-secondary-light: #D54C4C;
    --color-secondary-dark: #8D2828;
    --color-cream: #FCFFE7;
    --color-primary-dark: #125B50;
    --color-primary-light: #9FC088;
    --color-green-dark: #ACB992;
    --color-green-light: #E4E9BE;
    --color-yellow: #F8B400;
    --color-grey-light: #FAF5E4;
    --color-grey-dark: #aaa;
    --color-pink: #FF6363;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 62.5%;
    letter-spacing: .12rem;
  }

  body {
    margin: 0;
    padding: 2rem;
    height: 100vh;
    background-color: var(--color-primary-dark);
  }
`;
export default GlobalStyles;
