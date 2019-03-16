import * as React from 'react';
import { Matrix } from './components/Matrix';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorder } from './utils';
import { TowerName } from './components/TowerArea';

export type Card = {
  id: string;
  title: string;
};

type State = {
  doCards: Card[];
  decideCards: Card[];
  delegateCards: Card[];
  deleteCards: Card[];
};

const initialState: State = {
  decideCards: [],
  delegateCards: [],
  deleteCards: [],
  doCards: []
};

type ContextProps = State & {
  onAddCard: (towerName: TowerName, card: Card) => void;
  onSetCard: (towerName: TowerName, card: Card) => void;
};
export const AppContext = React.createContext<ContextProps>({
  ...initialState,
  onAddCard: () => ({}),
  onSetCard: () => ({})
});

const App: React.FunctionComponent = () => {
  const [state, setState] = React.useState<State>(initialState);

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const cards = reorder(state.doCards, result.source.index, result.destination.index);
    setState({ ...state, doCards: cards });
  }

  function onAddCard(towerName: TowerName, card: Card) {
    switch (towerName) {
      case 'do':
        setState({ ...state, doCards: [card, ...state.doCards] });
        break;
      case 'delete':
        setState({ ...state, deleteCards: [card, ...state.deleteCards] });
        break;
      case 'delegate':
        setState({ ...state, delegateCards: [card, ...state.delegateCards] });
        break;
      case 'decide':
        setState({ ...state, decideCards: [card, ...state.decideCards] });
        break;
      default:
        throw Error(`Unknown towername ${towerName}`);
    }
  }

  function onSetCard(towerName: TowerName, card: Card) {
    switch (towerName) {
      case 'do': {
        const newCards = state.doCards.map(i => (i.id === card.id ? card : i));
        setState({ ...state, doCards: [...newCards] });
        break;
      }
      case 'delete': {
        const newCards = state.deleteCards.map(i => (i.id === card.id ? card : i));
        setState({ ...state, deleteCards: [...newCards] });
        break;
      }
      case 'delegate': {
        const newCards = state.delegateCards.map(i => (i.id === card.id ? card : i));
        setState({ ...state, delegateCards: [...newCards] });
        break;
      }
      case 'decide': {
        const newCards = state.decideCards.map(i => (i.id === card.id ? card : i));
        setState({ ...state, decideCards: [...newCards] });
        break;
      }
      default:
        throw Error(`Unknown towername ${towerName}`);
    }
  }

  return (
    <AppContext.Provider value={{ ...state, onAddCard, onSetCard }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Matrix />
      </DragDropContext>
    </AppContext.Provider>
  );
};

export default App;
