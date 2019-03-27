import React, { Component } from 'react';
import './pizzacomponents.css';
import Menu from '../images/menu-icon1.jpg';
import Pizza from './pizza.js';

class PizzaComponent extends Component {

  constructor(props) {
    super(props);

    //for storing response data
    this.state = {
      loading: true, //used for showing "loading" text
      originalResponse: [], //used for saving data from server response
      pizzaData: [],
      inputFilterText : "", //used for user's input filter text
      showMessage : false, //used for showing a info msg if no pizza is available
    };
  }

  /*
  *fetch the pizza list from the specified URL and save it to local variables
  */
  componentDidMount() {  
    Pizza.fetchPizzaList()      
      .then(responsedata => {
          this.setState({ pizzaData : responsedata.pizzas});
          this.setState({ originalResponse : responsedata.pizzas});
          this.setState({ loading: false});
          console.log(this.state.pizzaData);
        });
  }

  /*
  * filtering pizzas using input filter text entered by user
  */
  applyFilter(evt){

    //get user's input
    this.setState({inputFilterText: evt.target.value});
    let enteredInput = evt.target.value;

    //filter pizza list from server response
    let filteredPizzaData = this.state.originalResponse;
    filteredPizzaData = filteredPizzaData.filter((item => {
        return item.toLowerCase().trim().includes(enteredInput.toLowerCase().trim());
    }) );

    //if no such pizza name is available then show a message to user that it isn't available
    if(filteredPizzaData.length === 0){
      this.setState({showMessage:true});
    }
    else{
      this.setState({showMessage:false});
    }

    //re-render the list of pizzas
    this.setState({pizzaData: filteredPizzaData});

  }

  /*
  * sorting list of original pizzas as well as using input filter text entered by user
  */
  sortPizzas(evt){
    let pizzas = this.state.pizzaData;

    //sorting pizzas in reverse alphabetic order
    this.setState({
      pizzaData: pizzas.sort(function(item1, item2){
                      if(item1.toLowerCase() > item2.toLowerCase())
                        return 1;
                      if(item1.toLowerCase() < item2.toLowerCase())
                        return -1;
                      return 0;
                    }).reverse()
      });
      
  }

  /*
  * render the UI
  */
  render(){

    if(this.state.loading){
      return(
        <div className="App text-font-color load-text"> <p>Loading data...</p> </div>
      )
    }
    else{
            return (
                <div className="container margin-elem">
                  <div className="form-group row">
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
                      <input type="text" id="filterInput" className="form-control hover-effect input-lg text-font-color" value={this.state.inputFilterText} onChange={this.applyFilter.bind(this)} placeholder="Search your favorite Pizza..."/>
                    </div>
                    <div className="col-md-2">
                        <input type="button" id="sortButton" className="form-control btn btn-info btn-lg hover-effect" value="Sort Pizzas" onClick={this.sortPizzas.bind(this)}/>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <img src={Menu} className="Menu-icon img-effects" alt="Menu"/>
                    </div>
                    <div className="col-md-7 list-div">
                      <ul className="list-group text-font-color">
                      {
                        this.state.pizzaData.map((value, index) => {
                          return <li className="list-group-item" key={index}><b> {value} </b></li>
                        })
                      }
                      </ul>
                      {
                        this.state.showMessage ? <p className="text-font-color text-msg"> No Pizza is available with this name </p> : null
                      }
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                </div>
            )
    }
  }

}

export default PizzaComponent;
