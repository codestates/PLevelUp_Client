import React from 'react';
import styles from '../../styles/common/Badge.module.scss';
export default function Badge({ children, type }: any) {
  return (
    <>
      <div className={`${styles.badge} ${styles[`${type}`]}`}>{children}</div>
    </>
  );
}
