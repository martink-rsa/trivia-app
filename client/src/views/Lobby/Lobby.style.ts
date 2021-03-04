import styled from "styled-components";

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
  padding: 50px 20px 10px 20px;

  form {
    padding: 0;
    margin: 0;
    width: 100%;
    button {
      margin-top: 20px;
    }
  }
`;

export const PlayersList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin: 0;
  padding: 0;
  list-style: none;
`;
