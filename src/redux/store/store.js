import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const Store = createStore(rootReducer);

export default Store;
