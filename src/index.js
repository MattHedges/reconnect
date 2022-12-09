import { React } from 'react';
import { ReactDOM } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './Reconnect';

import { BrowserRouter } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  const container = document.getElementById("root")
  const root = createRoot(container)
  root.render(

  <BrowserRouter>
    <App />
  </BrowserRouter>
);

