import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startCheckingAction } from '../actions/authActions';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

const AppRouter = () => {
   const dispatch = useDispatch();
   const { checking, uid } = useSelector((state) => state.auth);

   useEffect(() => {
      dispatch(startCheckingAction());
   }, [dispatch]);

   if (checking) {
      return <div>Cargando...</div>;
   }

   return (
      <Router>
         <div>
            <Switch>
               <PublicRoute
                  exact
                  path="/login"
                  component={LoginScreen}
                  isAuthenticated={!!uid}
               />
               <PrivateRoute
                  exact
                  path="/"
                  component={CalendarScreen}
                  isAuthenticated={!!uid}
               />

               <Redirect to="/" />
            </Switch>
         </div>
      </Router>
   );
};

export default AppRouter;
