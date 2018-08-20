import React, { Component } from 'react';
import '../css/App.css';
import Map from "../components/Map";
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

import { withRouter, Route, Switch } from 'react-router-dom'

import { Modal } from 'semantic-ui-react'

import ParkDetails from "../components/ParkDetails";
import AuthForm from "../components/AuthForm";



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      parkData: [],
      parkDesignation: "Park Designation",
      searchTerm: ''
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
  handleDesignationFilter = (e) => {
    this.setState({parkDesignation: e.target.innerText})
  }
  handleUserSignup = (userInfo) => {
    console.log(userInfo)
  }

  handleUserLogin = (userInfo) => {
    console.log(userInfo)
  }

  handleSearch = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  filterBySearchTerm = () => {
    return this.state.parkData.filter(park => {
      return park.name.includes(this.state.searchTerm)
    })
  }

  render() {
    return (
      <div className="App">
        <Route path="/" render={routerProps =>
            <React.Fragment>
                <NavBar
                  handleDesignationFilter={this.handleDesignationFilter}
                  parkDesignation={this.state.parkDesignation}
                  handleSearch={this.handleSearch}
                />
                <Map {...routerProps} parkData={this.state.parkData}/>
                <SideBar />
            </React.Fragment>
        }/>
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
