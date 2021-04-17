import styles from '../../styles/common/Error.module.scss';

import { ReactNode } from 'react';

// children에 메세지 바로 받는 식으로 해두었는데
// css 하는 거에 따라 message를 분리해야할 경우 그 때 분리
export default function Error({ children }: { children: ReactNode }) {
  return <div className={styles.errorWrapper}>{children}</div>;
}
