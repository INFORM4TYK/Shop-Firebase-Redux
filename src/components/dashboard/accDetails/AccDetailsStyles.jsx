import styled from "styled-components";

export const DetailsContainer = styled.section`
  background-color: var(--color-darker-white);
  box-shadow: 0px 0px 20px -9px var(--color-darker-white);
  border-radius: 4px;
  width: calc(100% - 10%);
`;
export const Nav = styled.nav`
  background-color: var(--main-color);
  color: var(--text-dark);
  box-shadow: 0px 0px 20px -9px var(--color-darker-white);
  border-radius: 4px 4px 0 0;
  padding: 0.5rem;
  text-align: center;
`;
export const FormDetails = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem;
  gap: 2rem;
  input,
  textarea {
    margin-top: 0.5rem;
    border: none;
    padding: 0.5rem;
    border-radius: 4px;
    box-shadow: 0px 2px 1px 0px rgba(66, 68, 90, 1);
    width: 100%;
  }
  label:nth-child(4) {
    input {
      width: 40%;
    }
  }
  label:nth-child(5) {
    grid-column: span 2;
    textarea {
      width: 100%;
      resize: none;
    }
  }
  @media screen and (max-width: 900px) {
    display: block;
    input,
  textarea {
    margin: 1rem 0;
  }
  }
`;
