import React from 'react';
import styles from '../../styles/common/Tag.module.scss';
export default function Tag({ children, type }: any) {
  return (
    <>
      <div className={`${styles.tag} ${styles[`${type}`]}`}>{children}</div>
    </>
  );
}
