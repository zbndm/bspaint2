import React, { useRef, useEffect, useState, MutableRefObject } from 'react';
import { Grid, Paper } from '@material-ui/core';
import Palette from './Palette';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  canvasContainer: {
    margin: '5vh',
  },
  canvas: {
    width: 800,
    height: 500,
  },
}));

const Canvas = () => {
  const classes = useStyles();

  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>;
  const canvasContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [style, setStyle] = useState({ color: '#000000', size: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const mouse = { x: 0, y: 0 };
      canvas.addEventListener(
        'mousemove',
        function (e) {
          mouse.x = e.pageX - this.offsetLeft;
          mouse.y = e.pageY - this.offsetTop;
        },
        false
      );

      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.size;

      canvas.addEventListener(
        'mousedown',
        () => {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);

          canvas.addEventListener('mousemove', onPaint, false);
        },
        false
      );

      canvas.addEventListener(
        'mouseup',
        () => {
          canvas.removeEventListener('mousemove', onPaint, false);
        },
        false
      );

      const onPaint = () => {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      };
    }
  }, [style]);

  const renderCanvas = () => {
    return (
      <Grid container justifyContent="center" ref={canvasContainerRef}>
        <Grid item>
          <Paper elevation={24}>
            <canvas width={600} height={600} ref={canvasRef} />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container direction="row" justifyContent="space-around">
      <Grid item xs={2}>
        <Palette style={style} setStyle={setStyle} />
      </Grid>
      <Grid item xs={8}>
        {renderCanvas()}
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
};

export default Canvas;
