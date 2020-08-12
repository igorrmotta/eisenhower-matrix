import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Paper, Typography, Icon, IconButton, TextField } from '@material-ui/core';
import { Card, AppContext } from '../App';
import { Edit, Save } from '@material-ui/icons';
import './CardItem.sass';
import { TowerName } from './TowerArea';

type Props = {
  towerName: TowerName;
  index: number;
  card: Card;
};
type State = {
  editing: boolean;
  title: string;
};
const CardItem: React.FunctionComponent<Props> = props => {
  const [state, setState] = React.useState<State>({ editing: false, title: '' });
  const appContext = React.useContext(AppContext);

  const onEdit = () => {
    setState({ ...state, editing: true, title: props.card.title });
  };

  const onCompleteEdit = () => {
    setState({ ...state, editing: false });
    appContext.onSetCard(props.towerName, { ...props.card, title: state.title });
  };

  const onChangeTitle = (v: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, title: v.target.value });
  };

  return (
    <Draggable draggableId={props.card.id} index={props.index}>
      {provided => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Paper className="card-item" elevation={1}>
            {!!state.editing && (
              <>
                <TextField style={{ flexGrow: 1 }} onChange={onChangeTitle} value={state.title} />
                <IconButton onClick={onCompleteEdit}>
                  <Save fontSize="small" />
                </IconButton>
              </>
            )}
            {!state.editing && (
              <>
                <Typography variant="subtitle1" children={props.card.title} />
                <IconButton onClick={onEdit}>
                  <Edit fontSize="small" />
                </IconButton>
              </>
            )}
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

export { CardItem };
