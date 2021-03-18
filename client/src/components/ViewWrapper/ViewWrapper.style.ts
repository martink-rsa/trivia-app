import styled from 'styled-components';

type WrapperProps = {
  backgroundColor: string;
};

export const Wrapper = styled.main<WrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100%;
  height: auto;
  width: 100%;
  background-color: ${(props) =>
    props.backgroundColor === 'primary'
      ? props.theme.color.primary
      : props.backgroundColor};
  padding: 50px 20px 50px 20px;

  form {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    width: 100%;
  }
`;
