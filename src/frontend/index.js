import React from 'react';
import App from './app';
import Stream from './component/stream';

const domNode = document.getElementById('app');

const render = () => {
  React.render(
    <Stream data={app.getData()}></Stream>,
    domNode
  );
};

const app = new App(render, requestAnimationFrame.bind(global));

app.render();
