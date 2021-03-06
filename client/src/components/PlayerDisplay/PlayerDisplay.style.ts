import styled from 'styled-components';

const ICON_SIZE = 70;

export const Wrapper = styled.li``;

type IconContainerProps = {
  playerColor: string;
};

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  background: ${(props) => props.playerColor};
  border-radius: 50%;
`;

export const Name = styled.div`
  text-align: center;
`;
