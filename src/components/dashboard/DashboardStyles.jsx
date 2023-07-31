import styled from "styled-components";

export const DashboardContainer = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  gap: 2rem;
  text-align: justify;
  flex-direction: column;
  align-items: center;
  transform: all 1s ease;
  margin-top: 2rem;
`;
export const AlertSection = styled.section`
  & > * {
    color: var(--main-color);
    background-color:#159a9c22;
    border-radius: 4px;
    padding: 1rem;
  }
`;
