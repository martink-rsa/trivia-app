import React from 'react';
import styled from 'styled-components';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  invert?: boolean;
  secondary?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

type StyleProps = {
  secondary?: boolean;
  fullWidth?: boolean;
};

/** Baseline for generic styling that won't change */
const BaselineButton = styled.button<StyleProps>`
  font-size: 2.25rem;
  font-weight: 600;
  background: none;
  border-radius: 35px;
  padding: 8px 20px;
  cursor: pointer;
  width: ${(props) => props.fullWidth && '100%'};
`;

/** Main button style */
const StyledButton = styled(BaselineButton)<StyleProps>`
  color: ${(props) =>
    props.secondary ? props.theme.color.secondary : props.theme.color.primary};
  border: 7px solid
    ${(props) =>
      props.secondary
        ? props.theme.color.secondary
        : props.theme.color.primary};
  :disabled {
    color: #c4c4c4;
    border-color: #c4c4c4;
    cursor: not-allowed;
  }
`;

/** Inverted color for when you want to add a button to a primary color */
const InvertedButton = styled(BaselineButton)<StyleProps>`
  color: #fff;
  border: 4px solid #fff;
  background: none;
`;

/**
 * A multi-purpose button
 */

const Button = ({ children, invert, ...props }: Props) => {
  if (invert) {
    return <InvertedButton {...props}>{children}</InvertedButton>;
  }
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
