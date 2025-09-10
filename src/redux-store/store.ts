import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './reducers/todoReducer';


export const store = configureStore({
  reducer: {
    todos: todosReducer,
    // [api.reducerPath]: api.reducer,
  },
  // middleware: (getDefault) => getDefault().concat(api.middleware),
  // devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
