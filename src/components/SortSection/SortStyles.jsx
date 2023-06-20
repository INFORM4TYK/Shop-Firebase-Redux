import styled, { css, keyframes } from "styled-components";
export const SortSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 1rem 1rem 0 1rem;
  gap: clamp(0.2rem, 2vw, 2rem);
  button {
    padding: 0.1rem;
  }
  @media screen and (max-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1rem 1rem 0 1rem;
    gap: 0.5rem;
    place-items: start center;
    button {
      width: 100%;
      height: 50px;
    }
  }
`;
export const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: 1s ease;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const RangeSection = styled.section`
  width: 100%;
  max-width: 150px;
  gap: 0.5rem 0;
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  button:nth-child(2),
  button:nth-child(3) {
    margin-top: 0.5rem;
    margin-inline: 5%;
    width: 40%;
  }
`;
export const expandAnimation = keyframes`
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 200px;
  }
`;

export const collapseAnimation = keyframes`
  from {
    opacity: 1;
    max-height: 200px;
  }
  to {
    opacity: 0;
    max-height:0;
  }
`;

export const ExpandContainer = styled.div`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? "500px" : "0")};
  transition: max-height 0.5s ease-out;
  animation: ${({ expanded }) =>
    expanded
      ? css`
          ${expandAnimation} .2s ease-in
        `
      : css`
          ${collapseAnimation} .2s ease-out
        `};
`;
