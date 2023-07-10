import styled from "styled-components";
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.6);
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: var(--color-darker-white);
  box-shadow: 0px 0px 20px -9px #fdf8f6;
  border-radius: 4px;
  padding: 3rem;
  margin:2rem;
  text-align:center;
`;
export const ButtonSection = styled.div`
  display: inline-flex;
  gap: 2rem;
`;
export const ModalProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  img {
    width: clamp(100px, 100%, 150px);
    margin: 0.5rem 0;
    aspect-ratio: 1/1;
    max-height: 150px;
    mix-blend-mode: multiply;
  }
`;
