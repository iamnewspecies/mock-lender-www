import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LenderRegistrationForm from './LenderRegistrationForm';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "whitesmoke",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function RegisterView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item lg={4} md={6} sm={8} xs={12}>
          <Box p={1}>
            <Paper>
              <LenderRegistrationForm />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}