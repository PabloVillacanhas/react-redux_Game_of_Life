import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./Reducers";
import { createStore } from "redux";

const rootElement = document.getElementById("root");

const createInitialState = {
  gliderSelected: "",
  mousedown: false,
  grid: Array(50)
    .fill(null)
    .map(() =>
      Array(50)
        .fill(null)
        .map(() => ({ alive: Math.random() >= 0.5, preview: false })),
    ),
};

let store = createStore(
  rootReducer,
  {
    gliderSelected: createInitialState.gliderSelected,
    mousedown: createInitialState.mousedown,
    grid: createInitialState.grid,
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);
