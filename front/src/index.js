

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {Routes,Route ,  BrowserRouter , Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js'
import { QueryClient, QueryClientProvider } from 'react-query';

import AdminLayout from "layouts/Admin.js";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
root.render(
  
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
      </QueryClientProvider>
  </React.StrictMode>
);


