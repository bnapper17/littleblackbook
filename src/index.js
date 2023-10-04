import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClientContextProvider } from './context/ClientContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ClientContextProvider>
        <App />
      </ClientContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

