import styled from "styled-components";

export const ProfilContainer = styled.section`
  background-color: var(--color-darker-white);
  box-shadow: 0px 0px 20px -9px var(--color-darker-white);
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding: 2rem 1rem;
  max-width: 90%;
  min-width: 500px;
  button {
    max-height: 30px;
  }
  & > * {
    margin-left: 1rem;
  }
  @media screen and (max-width: 700px) {
    align-items: center;
    flex-direction: column;
    min-width: 0;
    & > * {
      margin: 0;
    }
  }
`;
export const ProfilImage = styled.div`
  border-radius: 50%;
  min-width: 7rem;
  min-height: 7rem;
  max-height: 7rem;
  max-width: 7rem;
  display: flex;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  input[type="file"],
  input[type="file"]::-webkit-file-upload-button {
    cursor: pointer;
    opacity: 0;
    width: 100%;
    min-height: 7rem;
    max-height: 7rem;
    border-radius: 50%;
  }
`;
export const UserData = styled.section`
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid black;
  padding-right: 1rem;
  white-space: nowrap;
  nav {
    width: 100%;
    text-align: center;
    flex: 2;
  }
  section {
    display: flex;
    gap: 2rem;
  }
  label {
    margin: 1rem;
  }
  @media screen and (max-width: 700px) {
    border-right: none;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid black;
    width: 100%;
  }
`;
export const UserNoDesc = styled.section`
  display: grid;
  place-items: center;
  width: 100%;
  opacity: 0.5;
`;
export const UserDesc = styled.section`
  display: flex;
  padding: 1rem 0;
  @media screen and (max-width: 900px) {
    font-size: var(--fs-small);
  }
`;
export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  gap: 0.2rem;
  
`;
