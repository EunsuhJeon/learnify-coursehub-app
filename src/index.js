import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

import { BrowserRouter } from 'react-router-dom';
//import { AuthProvider } from './contexts/AuthContext';
import { AuthProvider } from './contexts/AuthContext';
import { CoursesProvider } from './contexts/CoursesContext';
import { CartProvider } from './contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CoursesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CoursesProvider>
    </AuthProvider>
  </BrowserRouter>
);
