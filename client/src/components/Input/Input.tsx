import React from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  children?: React.ReactNode;
}

type StyleProps = {};

/** Main wrapper that holds label and button */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

/** Label for button */
const Label = styled.label`
  margin-left: 10px;
  margin-bottom: 5px;
`;

/** Baseline styling for input */
const BaselineInput = styled.input<StyleProps>`
  font-size: 1.125rem;
  background: #fff;
  border: none;
  border-radius: 35px;
  padding: 8px 20px;
`;

function Input({ label, id, name, children, ...props }: Props) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <BaselineInput id={id} name={name} {...props}></BaselineInput>
    </Wrapper>
  );
}

export default Input;
