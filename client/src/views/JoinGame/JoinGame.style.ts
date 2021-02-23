import styled from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 50px 20px 10px 20px;

  img {
    max-width: 100%;
    width: 176px;
    margin-bottom: 50px;
  }

  form {
    padding: 0;
    margin: 0;
    width: 100%;
    button {
      margin-top: 20px;
    }
  }
`;
