import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.js';

it("renders without crashing", () => {
  const div = document.createElement("div")
  ReactDOM.render(<Card />, div)
  ReactDOM.unmountComponentAtNode(div)
});