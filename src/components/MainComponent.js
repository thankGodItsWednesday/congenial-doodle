import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
    console.log("onDishSelect invoked : ");
    console.log(this);
    console.log(this.state);
    console.log(this.state.dishes);
    console.log(this.state.selectedDish);
    console.log(dishId);
    console.log(this.state.dishes.filter((dish) => dish.id === parseInt(this.state.selectedDish))[0]);
  }

  render() {

    const HomePage = () => {
        return(
            <Home />
        );
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} /> } />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
      