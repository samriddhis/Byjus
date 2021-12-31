import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./app/store";
import RouterConfig from "./RouterConfig";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    );
  }
}
