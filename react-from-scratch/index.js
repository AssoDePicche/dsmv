import './fiber.js';

import { React } from './react.js';

const root = document.getElementById('root');

const updateApp = (title, description) => {
  const element = React.createNode(
    'div',
    { style: 'background: lightblue; border-radius: 8px; padding: 20px;' },
    React.createNode('h1', null, title),
    React.createNode('p', null, description)
  );

  React.render(element, root);
};

const delay = 2000;

updateApp('Mission 3: Fiber Tree Working!', `Wait ${delay / 1000} seconds for the update...`);

setTimeout(updateApp, delay, 'Mission 3: Reconciliation working!', 'The DOM Was Updated');
