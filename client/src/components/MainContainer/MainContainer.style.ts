import styled from 'styled-components';

type WrapperProps = {
  fullWidth: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  flex-grow: 1;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`;
