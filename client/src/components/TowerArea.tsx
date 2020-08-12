import * as React from 'react';
import { green, deepOrange } from '@material-ui/core/colors';
import { Typography, Tooltip, Button, IconButton } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { Add } from '@material-ui/icons';
import { Card, AppContext } from '../App';
import { CardItem } from './CardItem';
import { uuidv4 } from '../utils';

function getHelpText(name: TowerName) {
  switch (name) {
    case 'decide':
      return 'Schedule a time to do it';
    case 'delegate':
      return 'Who can do it for you?';
    case 'delete':
      return 'Eliminate it';
    case 'do':
      return 'Do it now!';
    default:
      throw Error(`Unknown tower name`);
  }
}

export type TowerName = 'do' | 'decide' | 'delegate' | 'delete';

type Props = {
  gridArea: string;
  color: 'green' | 'orange';
  towerName: TowerName;
};
type State = {
  hover: boolean;
};
const TowerArea: React.FunctionComponent<Props> = props => {
  const [state, setState] = React.useState<State>({ hover: false });
  const appContext = React.useContext(AppContext);

  const onMouseOver = () => {
    setState({ hover: true });
  };

  const onMouseLeave = () => {
    setState({ hover: false });
  };

  const onAddCard = () => {
    appContext.onAddCard(props.towerName, { title: '', id: uuidv4() });
  };

  const getCards = (): Card[] => {
    switch (props.towerName) {
      case 'do':
        return appContext.doCards;
      case 'delete':
        return appContext.deleteCards;
      case 'delegate':
        return appContext.delegateCards;
      case 'decide':
        return appContext.decideCards;
      default:
        throw Error(`Unknown towername ${props.towerName}`);
    }
  };

  const style: React.CSSProperties = {
    padding: '8px 8px 68px 56px',
    overflow: 'hidden',

    position: 'relative',

    gridArea: props.gridArea,
    backgroundColor: props.color === 'green' ? green[50] : deepOrange[50]
  };

  const cardListStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: 16,
    overflowY: 'auto',
    height: '100%',
    paddingRight: 16
  };

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    opacity: 0.8,
    color: '#fff',
    bottom: 0,
    right: 0,
    userSelect: 'none'
  };

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0
  };

  return (
    <div style={style} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <Droppable droppableId={`${props.towerName}-area`}>
        {provided => (
          <div style={cardListStyle} ref={provided.innerRef} {...provided.droppableProps}>
            {getCards().map((card, index) => (
              <CardItem towerName={props.towerName} key={card.id} card={card} index={index} />
            ))}
          </div>
        )}
      </Droppable>

      {!!state.hover && (
        <IconButton style={buttonStyle} onClick={onAddCard}>
          <Add fontSize="small" />
        </IconButton>
      )}

      <Tooltip title={getHelpText(props.towerName)}>
        <Typography variant="h2" style={textStyle} children={props.towerName} />
      </Tooltip>
    </div>
  );
};

export { TowerArea };
