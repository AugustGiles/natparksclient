import React, { Component } from 'react'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'

export default class SideBar extends Component {

  render() {
    return (
      <Sidebar
        as={Menu}
        animation='overlay'
        direction='right'
        icon='labeled'
        inverted
        onHide={this.handleSidebarHide}
        vertical
        visible={true}
        width='thin'
      >
      <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='camera' />
        Channels
      </Menu.Item>
      </ Sidebar>

    )
  }
}
