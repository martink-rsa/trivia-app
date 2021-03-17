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

export const Table = styled.table``;