import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToDo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
