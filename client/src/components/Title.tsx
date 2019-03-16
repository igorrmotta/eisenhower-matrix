import * as React from 'react';
import { Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

type Props = {
  title: string;
  gridArea: string;
  isVertical?: boolean;
};
const Title: React.FunctionComponent<Props> = props => {
  const style: React.CSSProperties = {
    gridArea: props.gridArea,

    backgroundColor: grey[50],

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    writingMode: !!props.isVertical ? 'vertical-rl' : undefined
  };

  const textStyle: React.CSSProperties = {
    transform: !!props.isVertical ? 'scale(-1)' : undefined
  };

  return (
    <div style={style}>
      <Typography style={textStyle} variant="title" children={props.title} />
    </div>
  );
};

export { Title };
