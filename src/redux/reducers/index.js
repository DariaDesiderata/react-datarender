import { combineReducers } from 'redux';
import tabReducer from './TabReducer/tab.reducer';

const rootReducer = combineReducers({
  selectedTabState: tabReducer
});

export default rootReducer;
