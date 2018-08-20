import React, { Component } from 'react'
import "../css/NavBar.css";
import { Menu, Sticky, Input, Dropdown } from 'semantic-ui-react'

export default class NavBar extends Component {

  render() {

    const options = [
      { key: 1, text: 'All Parks', value: "" },
      { key: 2, text: 'National Park', value: "National Park" },
      { key: 3, text: 'National Monument', value: "National Monument" },
      { key: 4, text: 'National Historic Site', value: "National Historic Site" },
      { key: 5, text: 'National Seashore', value: "Seashore" },
      { key: 6, text: 'National Preserve', value: "Preserve" },
      { key: 7, text: 'National Heritage Area', value: "Heritage" },
      { key: 8, text: 'National Scenic Riverway', value: "River" },
      { key: 9, text: 'National Battlefield/Military Park', value: "Battlefield" },
      { key: 10, text: 'National Recreation Area', value: "Recreation" },
    ]

    return (
      <Sticky className="NavBar">
        <Menu size='huge'>
          <Menu.Item header>Parks Map</Menu.Item>
          <Menu.Item>
            <Input
              placeholder='Search Parks...'
              onChange={(e) => this.props.handleSearch(e)}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              text={this.props.parkDesignation}
              pointing className='link item'
              options={options}
              onChange={ (e) => this.props.handleDesignationFilter(e)}
              selectOnBlur={false}
            />
          </ Menu.Item>
          <Menu.Item position='right'>Login</ Menu.Item>
        </ Menu>
      </Sticky>

    )
  }
}
