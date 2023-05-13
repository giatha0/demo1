import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/users' element={<User />} />
        <Route path='/admins' element={<Admin />} />
      </Routes>
    </BrowserRouter>

    {/* </React.StrictMode> */}
  </Provider>
);

reportWebVitals();
