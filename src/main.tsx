import React from 'react';
import ReactDOM from 'react-dom/client';
import './utils/zod.ts';
import App from './App.tsx';
import './globalAssets/index.scss';
import { ResourceCardSchema } from './models/resources/ResourceCard.ts';

ResourceCardSchema;
console.log(ResourceCardSchema);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
