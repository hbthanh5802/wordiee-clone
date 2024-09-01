import React from 'react';
import classNames from 'classnames/bind';

import styles from './GlobalStyles.module.scss';

const cx = classNames.bind(styles);

export default function GlobalStyles({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={cx('GlobalStyles')}>{children}</div>;
}
