import React from 'react';
import styles from '../../styles/common/Badge.module.scss';

type BadgePropsType = {
  type: string;
  children: string;
};
export default function Badge({ children, type }: BadgePropsType) {
  return (
    <>
      <div className={`${styles.badge} ${styles[`${type}`]}`}>{children}</div>
    </>
  );
}
