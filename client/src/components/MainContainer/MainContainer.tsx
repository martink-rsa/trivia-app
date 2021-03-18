import { ReactNode } from 'react';
import * as S from './MainContainer.style';

type Props = {
  fullWidth?: boolean;
  children: ReactNode;
};

/** A container for the main content on the page */
function MainContainer({ children, fullWidth = false }: Props) {
  return <S.Wrapper fullWidth={fullWidth}>{children}</S.Wrapper>;
}

export default MainContainer;
