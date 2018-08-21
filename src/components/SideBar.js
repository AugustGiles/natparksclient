import React, { Component} from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import "../css/SideBar.css";

export default class SideBar extends Component {
  render() {
    return (
        <Segment className="SideBar" basic
        style={this.props.theme==='light'?{backgroundColor:'white'}:{backgroundColor:'#202124'}}>
          <Header 
            style={this.props.theme==='light'?{color:'black'}:{color:'white'}} as='h2'>
            Hey (Whoever)
          </Header>
          <Divider section inverted/>
          <Header
            style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
            as='h3'>
            Your Saved Parks
          </Header>
        </Segment>
    )
  }
}
