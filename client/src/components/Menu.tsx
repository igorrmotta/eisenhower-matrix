import * as React from 'react';
import { Drawer, Paper, IconButton } from '@material-ui/core';
import { Inbox, Mail } from '@material-ui/icons';

const drawerWidth = 80;

const Menu: React.FunctionComponent<{}> = props => {
  const style: React.CSSProperties = {
    gridArea: 'sidebar',
    width: drawerWidth,
    maxWidth: drawerWidth,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    flexShrink: 0,
    whiteSpace: 'nowrap'
  };

  return (
    <Drawer variant="permanent" style={style} anchor="right" PaperProps={{ style, elevation: 4 }}>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <IconButton key={text}>{index % 2 === 0 ? <Inbox /> : <Mail />}</IconButton>
      ))}
    </Drawer>
  );
};

export { Menu };
