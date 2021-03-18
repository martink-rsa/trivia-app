import { ReactNode } from 'react';
import * as S from './ViewWrapper.style';

type Props = {
  backgroundColor?: string;
  children?: ReactNode;
};

/** Wrapper for each of the pages so that media queries are
 * handled in a single source.
 */
function ViewWrapper({ backgroundColor = '#fff', children }: Props) {
  return <S.Wrapper backgroundColor={backgroundColor}>{children}</S.Wrapper>;
}

export default ViewWrapper;
