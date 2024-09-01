import React from 'react';

import classNames from 'classnames/bind';
import styles from './Key.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  incrementPosition,
  setBoard,
  setKeyTracking,
} from '@/store/boardSlice';
const cx = classNames.bind(styles);

interface IKeyProps {
  letter: string;
}

const Key: React.FC<IKeyProps> = ({ letter }) => {
  const dispatch = useAppDispatch();
  const { board, currentPosition, currentRow } = useAppSelector(
    (state) => state.board
  );
  const currentUserRow = Math.floor(currentPosition / 5);

  const handleChooseLetter = () => {
    if (currentPosition >= 30) return;
    if (currentUserRow > currentRow) return;
    const _board = [...board];
    _board[currentPosition] = letter;
    dispatch(setBoard(_board));
    dispatch(incrementPosition());
    dispatch(setKeyTracking(letter));
  };

  return (
    <div className={cx('wrapper')} onClick={handleChooseLetter}>
      {letter}
    </div>
  );
};

export default Key;
