import styled from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px 20px;

  form {
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;
