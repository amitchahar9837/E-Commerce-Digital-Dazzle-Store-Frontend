import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from 'store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>

    <ToastContainer
      theme="dark"
      position="top-center"
      autoClose={2000}
      closeOnClick
      pauseOnHover={false} />
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);

