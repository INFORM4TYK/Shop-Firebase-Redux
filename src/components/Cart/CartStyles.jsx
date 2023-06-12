import styled from "styled-components";

export const CartContainer = styled.section`
  color: black;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  h2 {
    padding-top: 1rem;
    text-align: center;
  }
  img {
    width: 100%;
    max-width: 200px;
    margin-bottom: 0.5rem;
    aspect-ratio: 3/2;
    object-fit: contain;
    mix-blend-mode: multiply;
    user-select: none;
    pointer-events: none;
  }
  @media screen and (min-width: 360px) {
    img {
      max-width: 70%;
    }
  }
  @media screen and (min-width: 490px) {
    img {
      max-width: 40%;
    }
  }
`;
export const CartBox = styled.div`
  position: relative;
  display: block;
  background-color: #fdf8f6;
  box-shadow: 0px 0px 20px -9px #fdf8f6;
  border-radius: 4px;
  margin: 2rem 1rem;
  height: fit-content;
  width: 100%;
  max-width: 1200px;
  font-size: var(--fs-small);
  p {
    margin-bottom: 0.2rem;
    display: block;
  }
  div:nth-child(2) {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    height: 80%;
  }
  div:nth-child(3) {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    height: 20%;
    padding: 1rem 0;
    text-align: center;
    gap: 10%;
    background-color: #0000005f;
  }

  @media screen and (min-width: 620px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    h2 {
      max-width: 20%;
      min-width: 20%;
      padding-left: 2rem;
    }
    div:nth-child(2) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-width: 60%;
    }
    div:nth-child(3) {
      display: grid;
      place-items: center;
      gap: 1rem;
      margin-top: 0;
      padding: 7% 0;
      text-align: center;
      width: 100%;
      height: 100%;
    }
  }
`;
export const Summary = styled.section`
  background-color: #fdf8f6;
  text-align:center;
  padding: 2rem 1rem;
  gap: 2rem;
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  width: fit-content;
  border-radius: 4px;
  margin: 2rem 1rem 1rem 1rem;
  button{
    width: 150px;
  }
  h2 p {
    margin-top: 1rem;
    font-size: var(--fs-medium)
  }
`
export const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`