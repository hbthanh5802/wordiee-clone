import classNames from 'classnames/bind';

import styles from './Text.module.scss';
import { TextTypes } from '@/types';

const cx = classNames.bind(styles);

type HeadingProps = {
  tag: TextTypes;
  content: string;
  className?: string;
  style?: React.CSSProperties;
};

const Heading = ({ className, tag, content, style }: HeadingProps) => {
  return (
    <div
      className={cx('wrapper', {
        [`${className}`]: !!className,
        [`${tag.trim()}`]: !!tag.trim(),
      })}
      style={style}
    >
      {content}
    </div>
  );
};

export default Heading;
