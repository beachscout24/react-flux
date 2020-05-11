import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import App from "./components/App";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
