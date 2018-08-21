import React, { Component} from 'react'
import { Segment, Header, Divider, Accordion, Button } from 'semantic-ui-react'
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
          return {id: park.id, name: park.full_name}
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
      if (this.state.activeParkAlerts.length > 0) {
        return this.state.activeParkAlerts.map(alert => {
          return <Header as='h5'>{alert.title}</Header>
        })
      } else {
        return <Header as='h5'>Currently No Alerts To Show</Header>
      }
    }
  }

  renderEvents = (id) => {
    if (this.state.activePark === id) {
      if (this.state.activeParkEvents.length > 0) {
        return this.state.activeParkEvents.map(event => {
          return <Header as='h5'>{event.title}</Header>
        })
      } else {
        return <Header as='h5'>Currently No Events To Show</Header>
      }
    }
  }

  renderAccordionTitleAndContent = () => {
    if (this.props.followedParks) {
      return this.props.followedParks.map(park => {
        return (
          <React.Fragment key={park.id}>
            <Accordion.Title
              active={this.state.activePark === park.id}
              index={park.id}
              onClick={() => this.handleClick(park.id)}
              ><Header as='h3'>{park.name}</Header>
            </Accordion.Title>
            <Accordion.Content active={this.state.activePark === park.id}>
              <Segment>
                <Header as='h4'>Alerts:</Header>
                <Divider section inverted/>
                {this.renderAlerts(park.id)}
              </Segment>
              <Segment>
                <Header as='h4'>Events:</Header>
                <Divider section inverted/>
                {this.renderEvents(park.id)}
              </Segment>
              <Button onClick={() => this.props.history.push(`/${park.id}`)}>Go To Full Park Page</Button>
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
          <Accordion fluid styled inverted={this.props.theme==='light'? false : true}>
            {this.renderAccordionTitleAndContent()}
          </ Accordion>
        </Segment>
    )
  }
}
