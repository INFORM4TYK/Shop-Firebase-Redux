import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  gap: 2rem;
`;
export const FormContainer = styled.form`
  display: grid;
  place-items: center;
  background-color: #ffffff84;
  border-radius: 5px;
  padding: 2rem;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  font-size: 1.4rem;
  font-weight: 400;
  color: black;
 
  label {
    width: 100%;
    
  }
  input {
    margin-top: 1rem;
    width: 100%;
    padding: 0.6rem;
    border-radius: 5px;
    border: none;
  }
`;
export const CreateAccount = styled.div`
  p{
    font-size: var(--fs-small);
    text-decoration: underline;
  }
`
export const Details = styled.section`
  display: grid;
  place-items: center;
  height: 70vh;
`