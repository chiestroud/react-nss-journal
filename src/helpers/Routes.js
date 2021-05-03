import React from 'react';
import { Switch, Route } from 'react-router-dom';
import JanApr from '../views/JanApp';
import May from '../views/May';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={May}/>
        <Route path='/may' component={May}/>
        <Route path='/jan-apr' component={JanApr}/>
      </Switch>
    </div>
  );
}
