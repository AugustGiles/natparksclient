import React, { Component } from 'react';
import '../css/App.css';
import Map from "../components/Map";
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

import { withRouter, Route, Switch } from 'react-router-dom'

import { Modal, Grid, Transition } from 'semantic-ui-react'

import ParkDetails from "../components/ParkDetails";
import AuthForm from "../components/AuthForm";



class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      parkData: [],
      parkDesignation: "Park Designation",
      searchTerm: '',
      sidebarVisible: false,
      loggedIn: false,
      theme: "light"
    }
  }

  componentDidMount(){
    fetch('https://still-wildwood-14519.herokuapp.com/parks')
    .then(res=>res.json())
    .then(stateData=>this.setState({parkData:stateData}))
  }

  toggleTheme = () => {
    this.state.theme === "light"?this.setState({theme:"dark"}):this.setState({theme:"light"})
  }

  handleClose = (e) => {
    this.props.history.push('/')
  }
  handleDesignationFilter = (e) => {
    this.setState({parkDesignation: e.target.innerText})
  }
  handleUserSignup = (userInfo) => {
    fetch('https://still-wildwood-14519.herokuapp.com/users', {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(json => {
        // Successfully Signed Up
        localStorage.setItem('token',json.token)
        this.setState({loggedIn:true})
        this.props.history.push('/')
      })
      // Sign Up failed
      .catch(error=>{
        
      })
  }

  handleUserLogin = (userInfo) => {
    fetch('https://still-wildwood-14519.herokuapp.com/login', {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(res => res.json())
    .then(json => {
      // Successfully Logged In
      localStorage.setItem('token',json.token)
      this.setState({loggedIn:true})
      this.props.history.push('/')
    })
    // Log In Failed failed
    .catch(error=>{

    })
  }

  logoutUser = () => {
    localStorage.clear()
    this.setState({
      loggedIn: false,
      sidebarVisible: false
    })
  }

  handleExtendSidebar = () => {
    this.setState({sidebarVisible: !this.state.sidebarVisible})
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

  render() {

    return (
      <div className="App">
        <Route path="/" render={routerProps =>
          <React.Fragment>
            <NavBar
                  handleDesignationFilter={this.handleDesignationFilter}
                  parkDesignation={this.state.parkDesignation}
                  handleSearch={this.handleSearch}
                  parkData={this.state.parkData}
                  loggedIn={this.state.loggedIn}
                  sidebarVisible={this.state.sidebarVisible}
                  handleExtendSidebar={this.handleExtendSidebar}
                  theme={this.state.theme}
                  logoutUser={this.logoutUser}
                  {...routerProps}
                />
          
            <Grid style={{margin: 0}} className="view" 
            style={this.state.theme==='light'?{backgroundColor:'white'}:{backgroundColor:'#202124'}}>
              <Grid.Column style={{padding:0}}  width={this.state.sidebarVisible ? 12 : 16} >
                
                <Map
                  {...routerProps}
                  parkData={this.filterParks()}
                  sidebarVisible={this.state.sidebarVisible}
                  theme={this.state.theme}
                  toggleTheme={this.toggleTheme}
                />
              </Grid.Column>
              {this.state.sidebarVisible &&
                <Transition transitionOnMount={true} animation="fade left">
                  <Grid.Column width={4}style={{padding:0}}>
                    <SideBar theme={this.state.theme}/>
                  </Grid.Column>
                </Transition>
              }
            </Grid>
            </React.Fragment>
        }/>
        <Switch>
          <Route exact path="/signup" render={routerProps =>
            <Modal size="tiny" open closeIcon onClose={this.handleClose}>
              <AuthForm formType="signup" onSubmitHandler={this.handleUserSignup}/>
            </Modal>
          } />
          <Route exact path="/login" render={routerProps =>
            <Modal size="tiny" open closeIcon onClose={this.handleClose}>
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
