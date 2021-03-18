import styled from 'styled-components';

/* export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100%;
  height: auto;
  width: 100%;
  background-color: #fff;
  padding: 50px 20px 50px 20px;

  form {
    padding: 0;
    margin: 0;
    width: 100%;
    button {
      margin-top: 20px;
    }
  }
`; */

export const MainContainer = styled.div`
  flex-grow: 1;
`;

export const PlayersList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding-left: 10px;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  width: 100%;
  height: 50px;
  padding-left: 10px;
`;
