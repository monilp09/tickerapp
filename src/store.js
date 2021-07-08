import { createStore, combineReducers } from "redux";
import reducer from "./reducer/datareducer";

const reducers = combineReducers({
  reducer,
});

const store = createStore(reducers);

export default store;
