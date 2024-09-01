import React, { useEffect, useRef } from 'react';
import './Confetti.scss';

interface IConfettiProps {
  containerEl: HTMLDivElement | null;
  confettiFrequency: number;
  confettiColors: string[];
  confettiAnimations: string[];
  confettiInterval?: NodeJS.Timeout;
}

const useConfetti = (el: React.RefObject<HTMLDivElement>) => {
  const confettiProps = useRef<IConfettiProps>({
    containerEl: null,
    confettiFrequency: 3,
    confettiColors: ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'],
    confettiAnimations: ['slow', 'medium', 'fast'],
  }).current;

  useEffect(() => {
    if (!el.current) return;

    const _setupElements = () => {
      const containerEl = document.createElement('div');
      // const elPosition = el.current!.style.position;

      // if (elPosition !== 'relative' && elPosition !== 'absolute') {
      //   el.current!.style.position = ' ';
      // }

      containerEl.classList.add('confetti-container');
      el.current!.appendChild(containerEl);
      confettiProps.containerEl = containerEl;
    };

    const _renderConfetti = () => {
      confettiProps.confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div') as HTMLDivElement & {
          removeTimeout?: number;
        };
        const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
        const confettiBackground =
          confettiProps.confettiColors[
            Math.floor(Math.random() * confettiProps.confettiColors.length)
          ];
        const confettiLeft =
          Math.floor(Math.random() * el.current!.offsetWidth) + 'px';
        const confettiAnimation =
          confettiProps.confettiAnimations[
            Math.floor(Math.random() * confettiProps.confettiAnimations.length)
          ];

        confettiEl.classList.add(
          'confetti',
          'confetti--animation-' + confettiAnimation
        );
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        confettiEl.removeTimeout = window.setTimeout(function () {
          confettiEl.parentNode?.removeChild(confettiEl);
        }, 3000);

        confettiProps.containerEl?.appendChild(confettiEl);
      }, 25);
    };

    _setupElements();
    _renderConfetti();

    return () => {
      if (confettiProps.confettiInterval) {
        clearInterval(confettiProps.confettiInterval);
      }
    };
  }, [el, confettiProps]);
};

const Confetti: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useConfetti(containerRef);

  return <div ref={containerRef} className="js-container"></div>;
};

export default Confetti;
