import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.css";
import WebFont from "webfontloader";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/configureStore";

WebFont.load({
  google: {
    families: ["Poppins:300,600", "sans-serif"],
  },
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
