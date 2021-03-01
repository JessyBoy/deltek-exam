import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import postsReducer from "./ducks/posts";

const reducer = combineReducers({
  post: postsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
