import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body.dark-mode {
  --img: invert(1);
  --avatar-shadow: rgba(28,22,47,.3);
}

body.light-mode {
  --img: invert(0);
  --avatar-shadow: rgba(48,52,77,.1);
} 

* {
  --bg-light-yellow: #F2F2EE;
  --bg-light-blue: #EDF2FF;
  --bg-light-red: #F2EEEE;
  
  --light-yellow: #FFF6C5;
  --yellow: #F8C231;
    
  --light-red: #FFC5EC;
  --red: #FF6969;
  --pink: #ED81FF;
  --light-pink: #FFE9FA;
  
  --blue: #00A3FF;
  --light-blue: #B7F2FF;
  
  --white: #FFFFFF;
  --white20: #ecedee;
  --black: #11181C;
  --light-gray: #858585;
  --gray: #687076;
  --light-black: rgba(0,0,0,.05);
  --light-white: rgba(255,255,255,.03);
  
  margin: 0;
  padding: 0;
  border: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  line-height: normal;
  transition: all .1s ease;
  
  
}

html{
    scroll-behavior: smooth;
}
body {
  font-family: 'Inter', sans-serif;
  background: ${({ theme }) => theme.bg.primary};
  color: ${({ theme }) => theme.text.primary};
  text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;

}

a{
  color: ${({ theme }) => theme.text.primary};
}

.main{
    min-height: 100vh;
    
}
.toast-container {
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
}
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  
}

.nft-clipped{
  clip-path: url(#hex);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: calc(130% - 6px) !important;
  width: calc(130% - 6px) !important;
  object-position: center center;
  object-fit: cover;
  border-radius: 100% 100% 100% 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
}

.oval-clipped{
  clip-path: url(#oval);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: calc(130% - 6px) !important;
  width: calc(130% - 6px) !important;
  object-position: center center;
  object-fit: cover;
  border-radius: 100% 100% 100% 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
}

.product-image{
  height: 70px !important;
  width: 70px !important;
  object-position: center center;
  object-fit: cover;
  border-radius: 100% 100% 100% 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
}

.newproduct {
  width: calc(25% - 6px) !important;
  object-position: center center;
  object-fit: cover;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
   
`;

export default GlobalStyle;