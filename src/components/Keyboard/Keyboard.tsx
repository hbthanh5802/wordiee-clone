import React from 'react';

import wordListJson from '@/word.json';
import classNames from 'classnames/bind';
import styles from './Keyboard.module.scss';
import Key from './Key';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  decrementPosition,
  increaseRow,
  resetBoardState,
  setBoard,
  setKeyTracking,
} from '@/store/boardSlice';
import Confetti from '@/components/Confetti';
import Modal from '@/components/Modal';
import Text from '@/components/Text';
const cx = classNames.bind(styles);

const wordList = wordListJson.words;

const Keyboard: React.FC = () => {
  const keyboardId = React.useId();
  const dispatch = useAppDispatch();
  const [isWinner, setIsWinner] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { board, currentPosition, currentRow, correctWord } = useAppSelector(
    (state) => state.board
  );
  const rows: string[] = [
    'q w e r t y u i o p',
    'a s d f g h j k l',
    'z x c v b n m',
  ];

  const handleBackBtn = () => {
    if (Math.floor((currentPosition - 1) / 5) < currentRow) return;
    const _board = [...board];
    _board[currentPosition - 1] = '';
    dispatch(setBoard(_board));
    dispatch(decrementPosition());
    dispatch(setKeyTracking('back'));
  };

  const handleEnterBtn = () => {
    const userAnswerWord = board
      .slice(currentRow * 5, currentRow * 5 + 5)
      .map((value: string) => value.toUpperCase());
    const isFilledUserAnswer = userAnswerWord.every(
      (boardItemValue) => !!boardItemValue
    );

    if (currentRow > board.length / 5) return;
    if (!isFilledUserAnswer) return;
    if (!wordList.includes(userAnswerWord.join('').toLowerCase())) {
      alert('Wrong Word!');
      return;
    }

    dispatch(setKeyTracking('enter'));
    if (correctWord === userAnswerWord.join('')) {
      setIsWinner(true);
      setOpenModal(true);
    } else if (currentRow === 5) {
      setOpenModal(true);
    }
    dispatch(increaseRow());
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsWinner(false);
    dispatch(resetBoardState());
    dispatch(setKeyTracking('reset'));
  };

  return (
    <>
      <div className={cx('wrapper')}>
        {rows.map((row, index) => (
          <div key={keyboardId + index} className={cx('row')}>
            {index === 2 && (
              <span className={cx('function-key')} onClick={handleEnterBtn}>
                Enter
              </span>
            )}
            {row.split(/\s+/).map((rowItem, index) => (
              <Key key={keyboardId + '_key-item_' + index} letter={rowItem} />
            ))}
            {index === 2 && (
              <span className={cx('function-key')} onClick={handleBackBtn}>
                Back
              </span>
            )}
          </div>
        ))}
      </div>
      {isWinner && <Confetti />}
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div>
          <Text
            tag="body-1"
            content={isWinner ? 'Congratulation ! 💐🧡' : 'You lose ! 🙄❌'}
          />
        </div>
      </Modal>
    </>
  );
};

export default Keyboard;
