import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import JanApr from '../views/JanApp';
import May from '../views/May';
import June from '../views/June';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user
    ? (<Component {...taco} user={user} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any
};
export default function Routes({ user }) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={() => <Home user={user}/>}/>
        <PrivateRoute
          path='/may'
          user={user}
          component={May} />
         <PrivateRoute
          path='/june'
          user={user}
          component={June} />
        <PrivateRoute
          path='/jan-apr'
          user={user}
          component={JanApr} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any
};
