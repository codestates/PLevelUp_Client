import React from 'react';
import styles from '../../styles/common/Responsive.module.scss';

export type ResponsiveProps = {
  children: React.ReactNode;
};
function Responsive({ children, ...rest }: ResponsiveProps) {
  return (
    <div className={styles.responsive} {...rest}>
      {children}
    </div>
  );
}

export default Responsive;