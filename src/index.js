import React from 'react';
import App from './App';

//react 18 me pide que llame asi al root document
import { createRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
