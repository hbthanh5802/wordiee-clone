import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
const cx = classNames.bind(styles);

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const modalContainerVariant = {
  initial: {
    scaleX: 1,
    scaleY: 1,
  },
  show: {
    scaleX: [1, 1.5, 1],
    scaleY: [1, 1.5, 1],
    transition: {
      duration: 0.5,
    },
  },
};

const Modal: React.FC<IModalProps> = ({ children, isOpen, onClose }) => {
  return ReactDOM.createPortal(
    <div className={cx('overlay', { open: isOpen })} onClick={onClose}>
      <motion.div
        animate={isOpen ? 'show' : 'initial'}
        variants={modalContainerVariant}
        className={cx('container')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx('content')}>{children}</div>
      </motion.div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
