import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import { Provider } from "react-redux";
import store  from "./redux/store.js";  // Ensure the correct path
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
