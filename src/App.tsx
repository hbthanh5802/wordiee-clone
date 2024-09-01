import Text from '@/components/Text';
import Board from '@/components/Board';
import Keyboard from '@/components/Keyboard';
import './App.css';
import { useAppSelector } from './hooks/reduxHooks';
import Modal from './components/Modal';

function App() {
  const { board } = useAppSelector((state) => state.board);
  return (
    <div className="App">
      <div className="App__heading">
        <Text
          tag="heading-h3"
          content="Wordiee"
          style={{ color: 'var(--color-light-blue)' }}
        />
        <Text
          tag="subtitle-1"
          content="Another Word Board Game Clone"
          style={{ color: 'var(--color-white)' }}
        />
      </div>
      <Board board={board} />
      <Keyboard />
    </div>
  );
}

export default App;
