import "bootstrap/dist/css/bootstrap.css";
import { Fragment } from "react";
import { Provider } from "react-redux";

import HomePage from "./Component/HomePage";
import store from "./store";

import "./App.css";
import { Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Fragment>
          <Provider store={store}>
            <HomePage />
          </Provider>
        </Fragment>
      </Switch>
    </Router>
  );
}

export default App;
