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
      searchTerm: '',
      loggedIn: false
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

  filterParks = () => {
    switch (this.state.parkDesignation) {
      case "National Park":
        return this.state.parkData.filter(park=>park.designation.includes("National Park"))
      case "National Monument":
        return this.state.parkData.filter(park=>park.designation.includes("Monument"))
      case "National Historic Site":
        return this.state.parkData.filter(park=>park.designation.includes("Historic Site"))
      case "National Seashore":
        return this.state.parkData.filter(park=>park.designation.includes("Seashore"))
      case "National Preserve":
        return this.state.parkData.filter(park=>park.designation.includes("Preserve"))
      case "National Heritage Area":
        return this.state.parkData.filter(park=>park.designation.includes("Heritage"))
      case "National Scenic Riverway":
        return this.state.parkData.filter(park=>park.designation.includes("River"))
      case "National Battlefield/Military Park":
        return this.state.parkData.filter(park=>{return park.designation.match(/Battlefield|Military/)})
      case "National Recreation Area":
        return this.state.parkData.filter(park=>park.designation.includes("Recreation"))
      default:
        return this.state.parkData
    }
  }
  // handleSearch = (e) => {
  //   this.setState({searchTerm: e.target.value})
  // }

  // filterBySearchTerm = () => {
  //   return this.state.parkData.filter(park => {
  //     return park.name.includes(this.state.searchTerm)
  //   })
  // }


  render() {
    return (
      <div className="App">
        <Route path="/" render={routerProps =>
            <React.Fragment>
              <NavBar
                handleDesignationFilter={this.handleDesignationFilter}
                parkDesignation={this.state.parkDesignation}
                focusPark={this.focusPark}
                parkData={this.state.parkData}
                loggedIn={this.state.loggedIn}
                {...routerProps}
              />
              <Map {...routerProps} parkData={this.filterParks()}/>
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
    )
  }
}

export default withRouter(App)
