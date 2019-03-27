import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';
import 'jest-dom/extend-expect';
import PizzaComponent from './components/pizzacomponents.js';
import Pizza from './components/pizza.js';
import App from "./App.js";
import { resolve } from 'dns';
import { reject } from 'q';

afterEach(cleanup);

//UI component test
it('renders loading message', () => {
  const { getByText } = render(<PizzaComponent />);
  expect(getByText('Loading data...')).toBeInTheDocument();
  expect(getByText('Loading data...')).toMatchSnapshot();
});

/*Test case for API*/
it("Pizza API test case", async function () {

  global.fetch = jest.fn().mockImplementation(() => {

    var promise = new Promise((resolve, reject) =>{
      resolve({
        json: function () {
          return { pizzas: ["sausage, macroni"] };
        }
      })
    })

    return promise;

  })

  const response = await Pizza.fetchPizzaList();

  expect(response.pizzas).toEqual( ["sausage, macroni"]);

});



/*const fetch = jest.fn(() => {


});

it('render pizza component', () => {
  const PizzaCompo = renderer.create(<PizzaComponent />).toJSON();
  expect(PizzaCompo).toMatchSnapshot();
});

it('renders loading message', () => {
  const { getByText } = render(<PizzaComponent />);
  expect(getByText('Loading data...')).toBeInTheDocument();
});

it('render pizza component', () => {
    const PizzaCompo = renderer.create(<PizzaComponent />).toJSON();
    expect(PizzaCompo).toMatchSnapshot();
});

it('check input field on change', () => {
    const filterIp = renderer.create(<input/>).toJSON();
    expect(filterIp).toMatchSnapshot();
});

test('sortPizzas', () => {


});*/
