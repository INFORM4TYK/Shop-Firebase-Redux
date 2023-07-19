import styled from "styled-components";

export const ProfilContainer = styled.section`
  background-color: var(--color-darker-white);
  box-shadow: 0px 0px 20px -9px var(--color-darker-white);
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: calc(100% - 10%);
  padding: 2rem 1rem;
  & > * {
    margin-left: 1rem;
  }
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }
`;
export const ProfilImage = styled.div`
  border-radius: 50%;
  min-width: 7rem;
  min-height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserData = styled.section`
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid black;
  padding-right: 1rem;
`;
export const UserNoDesc = styled.section`
display: grid;
place-items: center;
width: 100%;
opacity: .5;

`;
export const UserDesc = styled.section`
  display: flex;
  padding: 1rem 0;

`