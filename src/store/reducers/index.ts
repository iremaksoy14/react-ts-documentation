import { combineReducers } from "redux";
import repositoriesReducer from "./repositoryReducer";

const reducers = combineReducers({
  repositories: repositoriesReducer,
});


export type RootState=ReturnType<typeof reducers>

export default reducers;
