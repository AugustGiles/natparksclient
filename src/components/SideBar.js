import React, { Component} from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import "../css/SideBar.css";

export default class SideBar extends Component {
  render() {
    return (
      <Segment className="SideBar" inverted basic>
        <Header as='h2'>Hey (Whoever)</Header>
        <Divider section inverted/>
        <Header as='h3'>Your Saved Parks</Header>
      </Segment>
    )
  }
}
