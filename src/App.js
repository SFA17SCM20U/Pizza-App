import React, { Component } from 'react';
import './App.css';
import PizzaComponent from './components/pizzacomponents.js';
import Logo from './images/logo.png';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App-header">
          <img src={Logo} alt="PizzaTym"/>          
        </div>
          <PizzaComponent>

          </PizzaComponent>
          <div className="footer-attr">
            <footer className="footer">
              <span><b>Copyright ©2019 PizzaTym, USA. All rights reserved.</b></span>
            </footer>
          </div>
      </div>
    );
  }
}

export default App;
