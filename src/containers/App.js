import React, { Component } from 'react';
import '../css/App.css';
import Map from "../components/Map";

import { withRouter, Route, Switch } from 'react-router-dom'

import { Modal } from 'semantic-ui-react'

import ParkDetails from "../components/ParkDetails";
import AuthForm from "../components/AuthForm";



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      parkData: []
    }
  }

  componentDidMount(){
    fetch('https://still-wildwood-14519.herokuapp.com/parks')
    .then(res=>res.json())
    .then(stateData=>this.setState({parkData:stateData}))
  }

  handleClose = (e) => {
    this.props.history.push('/')
  }

  handleUserSignup = (userInfo) => {
    console.log(userInfo)
  }

  handleUserLogin = (userInfo) => {
    console.log(userInfo)
  }

  render() {
    return (
      <div className="App">
        <Route path="/" render={routerProps =>  
            <Map {...routerProps} parkData={this.state.parkData}/>} />
        <Switch>
          <Route exact path="/signup" render={routerProps =>
            <Modal size="fullscreen" open closeIcon onClose={this.handleClose}>
              <AuthForm formType="signup" onSubmitHandler={this.handleUserSignup}/>
            </Modal>
          } />
          <Route exact path="/login" render={routerProps =>
            <Modal size="fullscreen" open closeIcon onClose={this.handleClose}>
              <AuthForm formType="login" onSubmitHandler={this.handleUserLogin}/>
            </Modal>
          } />
          <Route exact path="/:park" render={routerProps =>
            <Modal size="fullscreen" open closeIcon onClose={this.handleClose}>
              <ParkDetails {...routerProps}/>
            </Modal>
          }/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
