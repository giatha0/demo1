import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import 'nprogress/nprogress.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter >
      <Layout />
    </BrowserRouter>

    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
