import styled from "styled-components";

export const ProfilContainer = styled.section`
  background-color: var(--color-darker-white);
  box-shadow: 0px 0px 20px -9px var(--color-darker-white);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 2rem;
  width: 25%;
`;
export const ProfilImage = styled.div`
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserData = styled.section`
  text-align: center;
  display: flex;
  gap: 0.7rem;
  flex-direction: column;
`;
