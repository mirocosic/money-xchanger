import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import store from './store';
import { Rates, Exchange } from "./components"

export default class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header" style={{flexDirection: "row"}}>
            <Exchange />
            <Rates />
          </header>
        </div>
      </Provider>
    );
  }
}
