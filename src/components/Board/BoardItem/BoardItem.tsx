import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames/bind';
import styles from './BoardItem.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import { wordStatus } from '@/types';
const cx = classNames.bind(styles);

interface IBoardItem {
  value: string;
  'data-index': number;
}

const animateVariant = {
  filled: {
    scale: [1.2, 1],
    transition: {
      duration: 0.15,
    },
  },
  unfilled: {
    scale: [1.2000000001, 1],
    transition: {
      duration: 0.15,
    },
  },
};

// Define animation variants
const highlightVariant = {
  initial: { scale: 1 },
  highlighted: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const BoardItem: React.FC<IBoardItem> = ({
  value,
  'data-index': dataIndex,
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<wordStatus>(wordStatus.NORMAL);
  const { currentPosition, correctWord, currentRow, board, keyTracking } =
    useAppSelector((state) => state.board);

  const latestFilledPosition =
    currentPosition % 5 === 0 ? 4 : (currentPosition % 5) - 1;

  React.useEffect(() => {
    const userWord = board
      .slice(currentRow * 5, currentRow * 5 + 5)
      .map((value: string) => value.toUpperCase());
    const _correctWord = correctWord.split('');

    if (userWord[latestFilledPosition] === _correctWord[latestFilledPosition]) {
      setStatus(wordStatus.CORRECT);
    } else if (_correctWord.includes(userWord[latestFilledPosition])) {
      setStatus(wordStatus.ALMOST);
    }
  }, [value]);

  React.useEffect(() => {
    if (keyTracking === 'enter' && Math.floor(dataIndex / 5) < currentRow) {
      setIsSubmitted(true);
    } else if (keyTracking === 'reset') {
      setIsSubmitted(false);
      setStatus(wordStatus.NORMAL);
    }
  }, [keyTracking]);

  return (
    <motion.div
      animate={value ? 'filled' : 'unfilled'}
      variants={animateVariant}
    >
      <motion.div
        animate={dataIndex === currentPosition ? 'highlighted' : 'initial'}
        variants={highlightVariant}
        className={cx('wrapper', {
          focus: dataIndex === currentPosition,
          isSubmitted: isSubmitted && value,
          [status]: isSubmitted && value,
        })}
      >
        <span className={cx('content')}>{value}</span>
      </motion.div>
    </motion.div>
  );
};

export default BoardItem;
