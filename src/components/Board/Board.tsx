import React from 'react';
import BoardItem from './BoardItem';

import classNames from 'classnames/bind';
import styles from './Board.module.scss';
const cx = classNames.bind(styles);

type BoardProps = {
  board: string[];
};

const Board: React.FC<BoardProps> = (props) => {
  const { board } = props;
  const boardId = React.useId();
  return (
    <div className={cx('wrapper')}>
      {board.map((boardValue, index) => (
        <BoardItem
          key={boardId + index}
          value={boardValue}
          data-index={index}
        />
      ))}
    </div>
  );
};

export default Board;
