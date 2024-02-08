import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  background: #309292;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100vh;
`;

export const Spinner = styled.div`
  height: 100px;
  width: 100px;
  /* background: red; */
  /* opacity: 0.2; */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  border-top: solid red 5px;
  animation: ${rotate} 1s linear infinite;
`;

export const Button = styled.div`
  height: 100px;
  width: 100px;
  background: #046d8b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.listening &&
    css`
      animation: ${rotate} 1s linear infinite;

      /* animation: none; // Remova qualquer animação existente no botão */
    `}
  cursor: pointer;
`;

export const TextTranslation = styled.p`
  font-size: 20px;
  color: #fff;
`;

export const BlockLanguage = styled.div`
  height: 60px;
  width: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerLanguage = styled.div`
  display: flex;
  background: #fff;
  padding: 10px;
  border-radius: 4px;
`;

export const CountryIcon = styled.img`
  height: 30px;
  /* width: 100px; */
`;

export const Title = styled.h1`
  font-size: 30px;
  color: #fff;
`;

export const ButtonReListen = styled.div`
  height: 50px;
  width: 300px;
  background: #93a42a;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ContainerTranscription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
