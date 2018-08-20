import React, { Component } from 'react'
import { Menu, Sticky, Input, Dropdown } from 'semantic-ui-react'

export default class NavBar extends Component {

  render() {

    const options = [
      { key: 1, text: 'All Parks', value: 1 },
      { key: 2, text: 'National Park', value: 2 },
      { key: 3, text: 'National Monument', value: 3 },
      { key: 4, text: 'National Historic Site', value: 4 },
      { key: 5, text: 'National Seashore', value: 5 },
      { key: 6, text: 'National Preserve', value: 6 },
      { key: 7, text: 'National Heritage Area', value: 7 },
      { key: 8, text: 'National Scenic Riverway', value: 8 },
      { key: 9, text: 'National Battlefield', value: 9 },
      { key: 10, text: 'National Recreation Area', value: 10 },
      { key: 11, text: 'National Military Park', value: 11 },
    ]

    return (
      <Sticky>
        <Menu size='massive'>
          <Menu.Item header>Parks Map</Menu.Item>
          <Menu.Item>
            <Input
              placeholder='Search Parks...'
              onChange={(e) => this.props.handleSearch(e)}
            />
          </Menu.Item>
            <Dropdown
              text={this.props.parkDesignation}
              pointing className='link item'
              options={options}
              onChange={ (e) => this.props.handleDesignationFilter(e)}
            />
          <Menu.Item position='right'>Login</Menu.Item>
        </Menu>
      </Sticky>

    )
  }
}
