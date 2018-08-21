import React, { Component} from 'react'
import { Segment, Header, Divider, Accordion } from 'semantic-ui-react'
import "../css/SideBar.css";

export default class SideBar extends Component {
  state = {
    loading: true,
    user: {},
    activePark: -1,
    activeParkAlerts: [],
    activeParkEvents: []
  }

  componentDidMount() {
    fetch('https://still-wildwood-14519.herokuapp.com/profile', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({user: json, loading:false})
        let parks = json.parks.map(park => {
          return park.id
        })
        this.props.getUsersFollowedParks(parks)
      })
  }

  handleClick = (id) => {
    this.state.activePark === id? this.setState({activePark: -1}) : this.setState({activePark: id})

    fetch(`https://still-wildwood-14519.herokuapp.com/parks/${id}/alerts`)
      .then(res=>res.json())
      .then(json => this.setState({activeParkAlerts: json.data}))

    fetch(`https://still-wildwood-14519.herokuapp.com/parks/${id}/events`)
      .then(res=>res.json())
      .then(json => this.setState({activeParkEvents: json.data}))

  }

  renderAlerts = (id) => {
    if (this.state.activePark === id) {
      return this.state.activeParkAlerts.map(alert => {
        return <Header as='h5'>{alert.title}</Header>
      })
    }
  }

  renderEvents = (id) => {
    if (this.state.activePark === id) {
      return this.state.activeParkEvents.map(event => {
        return <Header as='h5'>{event.title}</Header>
      })
    }
  }

  renderAccordionTitleAndContent = () => {
    if (this.state.user.parks) {
      return this.state.user.parks.map(park => {
        return (
          <React.Fragment>
            <Accordion.Title
              active={this.state.activePark === park.id}
              index={park.id}
              onClick={() => this.handleClick(park.id)}
              ><Header>{park.full_name}</Header>
            </Accordion.Title>
            <Accordion.Content active={this.state.activePark === park.id}>
              <Segment>
                <Header as='h4'>Alerts:</Header>
                {this.renderAlerts(park.id)}
              </Segment>
              <Segment>
                <Header as='h4'>Events:</Header>
                {this.renderEvents(park.id)}
              </Segment>
            </Accordion.Content>
          </React.Fragment>
        )
      })


    }
  }

  render() {
    return (
        <Segment className="SideBar" basic
        style={this.props.theme==='light'?{backgroundColor:'white'}:{backgroundColor:'#202124'}}>
          <Header
            style={this.props.theme==='light'?{color:'black'}:{color:'white'}} as='h2'>
           {this.state.loading?"Loading...":this.state.user.username}
          </Header>
          <Divider section inverted/>
          <Accordion fluid styled inverted={this.props.theme==='light'? false : true}>
            {this.renderAccordionTitleAndContent()}
          </ Accordion>
        </Segment>
    )
  }
}

// <Header
//   style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
//   as='h3'>
//   Your Saved Parks
// </Header>
