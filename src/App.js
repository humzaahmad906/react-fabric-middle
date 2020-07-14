import React from 'react';
import {Provider} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import store from './store/store'
import MainView from './components/mainview';

function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <MainView />
      </Provider>
      
    </div>
  );
}
export default App;
