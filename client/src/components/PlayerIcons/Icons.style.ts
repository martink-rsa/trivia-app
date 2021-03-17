import styled from 'styled-components';

type IconContainerProps = {
  playerColor: string;
  size?: number;
};

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  background: ${(props) => props.playerColor};
  border-radius: 50%;
  margin: 0 auto;

  img {
    height: 70px;
    width: 60px;
  }
`;
