import styled from "styled-components";

const ICON_SIZE = 70;

export const Wrapper = styled.li``;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  background: blue;
  border-radius: 50%;
`;

export const Name = styled.div`
  text-align: center;
`;
