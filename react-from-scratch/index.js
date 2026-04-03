import { React } from './react.js';

const root = document.getElementById('root');

const element = React.createNode(
  'div',
  { style: 'background: salmon; border-radius: 8px; padding: 20px;' },
  React.createNode('h1', null, 'Mission 1: Success!'),
  React.createNode('p', null, 'If you can see this, you have eyes')
);

React.render(element, root);
