import styled from 'styled-components';

const CARET_BUTTON_SIZE = 50;
const COLOR_BUTTON_SIZE = 30;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconSelectionContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const CaretButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  width: ${CARET_BUTTON_SIZE}px;
  height: ${CARET_BUTTON_SIZE}px;
`;

export const ColorSelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

type ColorButtonProps = {
  color: string;
  isActive: boolean;
};

export const ColorButton = styled.button<ColorButtonProps>`
  width: ${COLOR_BUTTON_SIZE}px;
  height: ${COLOR_BUTTON_SIZE}px;
  background: ${(props) => props.color};
  border: 1px solid #3580b5;
  border-radius: 6px;
  margin-right: 5px;
  :last-of-type {
    margin: 0;
  }
`;
