import * as React from 'react';
import { Title } from './Title';
import { TowerArea } from './TowerArea';
import { Menu } from './Menu';
import './Matrix.sass';

const Matrix: React.FunctionComponent<{}> = props => {
  return (
    <div className="matrix-container">
      <Title gridArea="label-1" title="Urgent" />
      <Title gridArea="label-2" title="Not Urgent" />

      <TowerArea gridArea="do-area" color="green" towerName="do" />
      <TowerArea gridArea="decide-area" color="green" towerName="decide" />
      <TowerArea gridArea="delegate-area" color="orange" towerName="delegate" />
      <TowerArea gridArea="delete-area" color="orange" towerName="delete" />

      <Title gridArea="label-3" title="Important" isVertical={true} />
      <Title gridArea="label-4" title="Not Important" isVertical={true} />

      <Menu />
    </div>
  );
};

export { Matrix };
