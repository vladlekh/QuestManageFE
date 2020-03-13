import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, makeStyles, Switch, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { switchLightAction, turnLightAction } from '../../store/light/actions';
import { ActionHelper } from '../../utils/action.helper';

const useStyles = makeStyles({
  action: {
    marginTop: 0,
    marginBottom: 0,
  },
});

const LightComponent = ({ turnLight, switchLight }) => {
  const classes = useStyles();
  const [lightOn, setLightOn] = useState(false);

  const handleChange = (e) => {
    turnLight(!lightOn ? ActionHelper.lightEnum.ON : ActionHelper.lightEnum.OFF);
    setLightOn(!lightOn);
  };

  return (
    <Card>
      <CardHeader
        title="Освещение"
        action={
          <Switch
            size="medium"
            className={classes.checkbox}
            checked={lightOn}
            onChange={handleChange}
          />
        }
        classes={{ action: classes.action }}
      />
      <CardContent>
        <Grid container spacing={3} justify="space-between">
          <Grid item>
            <Typography variant="h6" component="h2">
              Димирование
            </Typography>
          </Grid>
          <Grid item>
            <Button color="primary" onClick={switchLight}>Активировать</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapDispatchToProps = ({
  turnLight: turnLightAction,
  switchLight: switchLightAction,
});

export const Light = connect(null, mapDispatchToProps)(LightComponent);
