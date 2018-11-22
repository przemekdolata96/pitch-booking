import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reservationsReducer from './reducers/reservations';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    reservations: reservationsReducer
});


export const configureStore = () => {
    return createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;
