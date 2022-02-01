import { oRender } from 'ojs-core';
import { App } from './views/App';

const app = document.getElementById('app');

oRender(app, new App());
