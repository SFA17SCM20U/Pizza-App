import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import PizzaComponent from './components/pizzacomponents.js';
import Pizza from './components/pizza.js';


const jsdom = require('jsdom');
const { JSDOM } = jsdom;

afterEach(cleanup);

//UI component test
it('renders loading message', () => {
  const { getByText } = render(<PizzaComponent />);
  expect(getByText('Loading data...')).toBeInTheDocument();
  expect(getByText('Loading data...')).toMatchSnapshot();
});

/**
 *Test case for API
*/
test('API Test loading', () => {
  let pizzalist;
  Pizza.fetchPizzaList().then(responsedata => {
        
    pizzalist = responsedata;
    expect(pizzalist).toEqual({"Pizzas": ["Sausage","Cheese","Pepperoni","Hawaiian","vegetable","3 cheeSe","macaroni","Chicken","Sausage and Pepperoni"]});

  })

});
