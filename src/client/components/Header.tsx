import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  header: {
    position: 'sticky',
    marginBottom: '5vh',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.header}>
        <Toolbar>
          <Typography variant="h5">
            BSPaint - a paint app project for the MintBean Hackathon!
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
