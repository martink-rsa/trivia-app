import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export interface ThemeProps {
  color: {
    primary: string;
  };
  colorText: {
    body: string;
  };
  animation: {
    short: string;
  };
}

const theme: ThemeProps = {
  color: {
    primary: 'var(--color-primary)',
  },
  colorText: {
    body: 'var(--color-text-body)',
  },
  animation: {
    short: '180ms',
  },
};

type Props = {
  children: ReactNode;
};

export const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
