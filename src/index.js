import './index.css';
import store from './redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';



 export let renederTree =()=>{
  ReactDOM.render(
      <BrowserRouter>
      <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>,document.getElementById('root'));
      
}
renederTree();
store.subscribe(()=>{
  renederTree()
});



