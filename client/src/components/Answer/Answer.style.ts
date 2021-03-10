import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 30px 0;
  width: 100%;
`;

type LabelProps = {
  isSelected: boolean;
};

export const Label = styled.label<LabelProps>`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 10px 10px;
  cursor: pointer;
  background: ${(props) =>
    props.isSelected ? props.theme.color.primary : 'none'};
  border-radius: 35px;
  :hover div > div {
    background: ${(props) => !props.isSelected && props.theme.color.primary};
  }
`;

export const Input = styled.input`
  display: none;
`;

export const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: #c4c4c4;
  margin-right: 10px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;
