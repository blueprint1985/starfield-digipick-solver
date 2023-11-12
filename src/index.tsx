import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SolverContainer from './components/SolverContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SolverContainer />
  </React.StrictMode>
);
