import styled from "styled-components";

export const Nav = styled.nav`
  width: 100%;
  text-align: center;
  font-size: var(--fs-big);
  padding: 2.5rem;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  button{
    color: var(--sec-color)
  }
  button:hover{
    color: var(--main-color)
  }
  a:nth-child(2) {
    margin-left: 1rem;
    padding-left: 1rem;
    border-left: 1px solid #ffffff;
  }
  & > div,
  * {
    color: var(--main-color);
    display: grid;
    place-items: center;
    grid-auto-flow: column;
    cursor: pointer;
    font-weight: 700;
  }

  div:nth-child(2) {
    display: inline-flex;
    gap: 2rem;
    flex-wrap: wrap;
    p {
      font-size: var(--fs-medium);
      color: #ffffff;
      margin-left: 0.4rem;
    }
  }
  @media screen and (max-width: 900px) {
    padding: 1.5rem;
    font-size: var(--fs-medium);
  }
  @media screen and (max-width: 500px) {
    font-size: var(--fs-small);
    padding: 1rem;
    div:nth-child(2) {
      gap: 1rem;
    }
  }
`;
