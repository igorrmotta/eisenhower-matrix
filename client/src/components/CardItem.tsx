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
          <Paper className="card-item">
            <div>
              {!!state.editing && (
                <>
                  <IconButton onClick={onCompleteEdit}>
                    <Save />
                  </IconButton>
                  <TextField onChange={onChangeTitle} value={state.title} />
                </>
              )}
              {!state.editing && (
                <>
                  <IconButton onClick={onEdit}>
                    <Edit />
                  </IconButton>
                  <Typography variant="subtitle1" children={props.card.title} />
                </>
              )}
            </div>
          </Paper>
        </div>
      )}
    </Draggable>
  );
};

export { CardItem };
