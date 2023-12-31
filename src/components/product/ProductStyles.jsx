import styled from "styled-components";
export const AlertSection = styled.section`
  display: grid;
  place-items: center;
  p {
    text-align: center;
    margin-top: 0;
    background-color: var(--text-dark);
    padding: 1rem;
    border-radius: 5px;
    font-size: 1.2rem;
    max-width: 300px;
    width: 100%;
    color: var(--color-white);
  }
`;
export const FormAddContainer = styled.form`
  display: grid;
  place-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0 10%;
  height: calc(100vh - 100px);
  h1 {
    font-size: var(--fs-big);
    color: var(--color-white);
  }
  button {
    max-width: 250px;
    width: 100%;
  }
  * {
    display: grid;
    width: 100%;
    margin-top: 1rem;
  }
  input {
    padding: 0.6rem;
    border-radius: 4px;
    border: none;
  }
  input[type="file"] {
    color: #5a5a5a;
    background-color: white;
    padding: 0;
    height: 2.3rem;
  }
  input[type="file"]::-webkit-file-upload-button {
    border: none;
    background-color: #0505054a;
    height: 2.3rem;
    width: 10%;
  }
  label {
    display: grid;
    font-size: 1.3rem;
    p {
      text-align: center;
      color: var(--color-white);
      background-color: var(--main-color);
      border-radius: 4px;
      width: fit-content;
      padding: 1rem 0;
    }
  }
  @media screen and (max-width: 400px) {
    padding: 1rem;
  }
`;
export const ProductContainer = styled.section`

  color: black;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  img {
    width: clamp(150px, 100%, 200px);
    margin: 0.5rem 0;
    aspect-ratio: 1/1;
    max-height: 170px;
    mix-blend-mode: multiply;
  }
  @media (max-width: 580px) {
    justify-content: center;
  }
`;

export const ProductCard = styled.article`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--color-darker-white);
  box-shadow: 0px 0px 20px -9px var(--color-darker-white);
  border-radius: 4px;
  overflow: hidden;
  margin: 2rem 1rem;
  padding: 1rem;
  height: 450px;
  min-width: calc((100% - 8rem) / 4);
  max-width: calc((100% - 8rem) / 4);
  font-size: var(--fs-small);
  p {
    height: 18px;
    width: 200px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  @media (max-width: 1320px) {
    min-width: calc((100% - 6rem) / 3);
  }
  @media (max-width: 940px) {
    min-width: max(calc((100% - 4rem) / 2));
  }
  @media (max-width: 580px) {
    max-width: 300px;
    width: 100%;
    display: grid;
    place-items: center;
  }
`;
export const Button = styled.button`
  background-color: var(--main-color);
  border-radius: 5px;
  border-style: none;
  box-sizing: border-box;
  color: var(--sec-color);
  display: inline-block;
  font-family: var(--ff-main);
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  margin: 0;
  outline: none;
  padding: 0 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  a {
    color: inherit;
    width: 100%;
  }
  &:hover,&:active {
    color: var(--main-color);
    background-color: var(--text-dark);
  }
`;
export const RowSection = styled.section`
 display: flex;
 flex-direction: row;
 column-gap: 1rem ;
& > *{
  margin-top: 1rem;
  font-weight: normal;
  font-size: var(--fs-small);
}
`
