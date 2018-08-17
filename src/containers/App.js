import React, { Component } from 'react';
import '../css/App.css';
import Map from "../components/Map";

import { withRouter, Route } from 'react-router-dom'

import { Modal } from 'semantic-ui-react'

import ParkDetails from "../components/ParkDetails";



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      parkDataByState: []
    }
  }

  componentDidMount(){
    fetch('https://still-wildwood-14519.herokuapp.com/parks')
    .then(res=>res.json())
    .then(stateData=>this.setState({parkDataByState:stateData}))
  }

handleClose = (e) => {
  this.props.history.push('/')
}

  render() {
    return (
      <div className="App">
        <Route path="/" render={routerProps =>  
            <Map {...routerProps} parkDataByState={this.state.parkDataByState}/>} />
        <Route exact path="/:park" render={routerProps =>
          <Modal size="fullscreen" open closeIcon onClose={this.handleClose}>
            <ParkDetails {...routerProps}/>
          </Modal>
        }/>
      </div>
    );
  }
}

export default withRouter(App);
