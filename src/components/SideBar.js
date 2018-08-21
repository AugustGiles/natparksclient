import React, { Component} from 'react'
import { Segment, Header, Divider, Accordion } from 'semantic-ui-react'
import "../css/SideBar.css";

export default class SideBar extends Component {
  state = {
    loading: true,
    user: {}
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
        console.log(json)
        this.setState(
          {
            user: json,
            loading:false
         })
         return json
      })
      .then(json => {
        json.parks.forEach(park => {
          this.props.getUsersFollowedParks(park.id)
        })
      })
  }

  renderAccordionTitleAndContent = () => {

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
