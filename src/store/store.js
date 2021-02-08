import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { uiReducer } from '../reducers/uiReducer';
import thunk from 'redux-thunk';
import { calendarReducer } from '../reducers/calendarReducer';
import { authReducer } from '../reducers/authReducer';

const rootReducer = combineReducers({
   ui: uiReducer,
   calendar: calendarReducer,
   auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
);

export default store;
