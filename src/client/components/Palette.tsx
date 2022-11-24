import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

import palette from '../utils/colors.json';
import { makeStyles } from '@material-ui/styles';

interface PaletteProps {
  style: StyleObj;
  setStyle: (style: StyleObj) => void;
}

interface StyleObj {
  color: string;
  size: number;
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 10,
    // flexGrow: 1,
  },
  palette: {
    // flexGrow: 5,
  },
}));

const Palette = ({ style, setStyle }: PaletteProps) => {
  const classes = useStyles();

  const renderColors = () => {
    return palette.colors.map((color) => {
      return (
        <Grid item xs={6} key={color}>
          <Box
            sx={{ margin: 1 }}
            style={{ backgroundColor: color }}
            onClick={() => setStyle({ size: style.size, color: color })}
          >
            <Typography align="center">{color.toUpperCase()}</Typography>
          </Box>
        </Grid>
      );
    });
  };

  const renderCurrentColor = () => {
    return (
      <Box
        sx={{
          width: 50,
          height: 50,
          margin: 20,
        }}
        style={{ backgroundColor: style.color, borderRadius: 10 }}
      />
    );
  };

  const renderSizeSelector = () => {
    return (
      <>
        <InputLabel id="sizeSelect">Pen size</InputLabel>
        <Select
          value={style.size}
          label="Pen size"
          labelId="sizeSelect"
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            setStyle({
              color: style.color,
              size: parseInt(event.target.value as string),
            })
          }
        >
          {[1, 5, 10].map((size) => {
            return (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            );
          })}
        </Select>
      </>
    );
  };

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <Paper elevation={24} className={classes.container}>
          <Grid container direction="column">
            <Grid item>
              <Grid container direction="row" wrap="wrap">
                {renderColors()}
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item>{renderCurrentColor()}</Grid>
                <Grid item>{renderSizeSelector()}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Palette;
