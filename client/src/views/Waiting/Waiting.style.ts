import styled from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 50px 20px 50px 20px;

  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
    button {
      margin-top: 20px;
    }
  }
`;

export const MainContainer = styled.div`
  flex-grow: 1;
`;

export const PlayerList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px 0;
  margin-top: 50px;

  max-width: 500px;
  width: 100%;

  @media (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    grid-template-columns: 1fr;
  }
`;
