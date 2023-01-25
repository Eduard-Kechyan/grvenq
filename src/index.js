import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './store/store'

import './utilities/i18n';

import { library } from "@fortawesome/fontawesome-svg-core";
import * as IconsSolid from "@fortawesome/free-solid-svg-icons";
import * as IconsRegular from "@fortawesome/free-regular-svg-icons";

import './index.scss';

import App from './App';

const iconListSolid = Object.keys(IconsSolid)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => IconsSolid[icon]);
const iconListRegular = Object.keys(IconsRegular)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => IconsRegular[icon]);

library.add(...iconListSolid, ...iconListRegular);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);