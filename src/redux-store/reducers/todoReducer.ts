
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Todo = { 
  id: string; 
  title: string;
  completed: boolean
   };

type TodosState = {
  items: Todo[];
  loading: boolean;
  error?: string;
};

const initialState: TodosState = { items: [], loading: false,error:undefined };

//state'in tipini initialstate'den  ts otomatik çıkarıyor.Initialstate tipine  bakıyof,reducer fonksiyonlarının state parametresini o tipte kabul ediyor.
const todosSlice = createSlice({
  name: 'todos', //action type'lara önek olur
  initialState, //başlangıç state
  reducers: { //senkron state güncellemeleri
    addTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      state.items.push({ id: action.payload.id, title: action.payload.title, completed: false });
    },

    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const t = state.items.find(x => x.id === action.payload.id);
      if (t) t.completed = !t.completed;
    },

    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(x => x.id !== action.payload.id);
    },

    clearError: (state) => { state.error = undefined; },
  },
});

export const { addTodo, toggleTodo, removeTodo, clearError } = todosSlice.actions; //her reducer için type-safe action-creator üretir
export default todosSlice.reducer; //store'a ekleyecepin asıl reducer
