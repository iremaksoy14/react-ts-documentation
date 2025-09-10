import React from "react";
import logo from "./logo.svg";
import GuestList from "./state/GuestList";
import "./App.css";
import Parent from "./props/Parent";
import UserSearch from "./state/UserSearch";
import EventComponent from "./events/EventComponent";
import { Provider } from "react-redux";
import {store} from "./redux-store/store"
import Repositorieslist from "./components/Repositorieslist";

function App() {
  return (
    <Provider store={store}>
      <h1>Search For a Package</h1>
      <Repositorieslist />
    </Provider>
  );
}

export default App;
