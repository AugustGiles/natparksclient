import React, { Component } from 'react'
import { Menu, Sticky, Input, Dropdown, Search } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {
    isLoading: false,
    results: [],
    value: '' 
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: "" })
    this.props.history.push(`/${result.id}`)
  }


  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const res = this.props.parkData.filter(park => {
        return park.full_name.toLowerCase().includes(this.state.value.toLowerCase())
      }).map(park=>(
          {title:park.full_name, description:park.designation, id:park.id}))

      this.setState({
        isLoading: false,
        results: res,
      })
    }, 300)
  }

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

    const { isLoading, value, results } = this.state

    return (
      <Sticky className="NavBar">
        <Menu size='massive'>
          <Menu.Item header>Parks Map</Menu.Item>
          <Menu.Item>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
            />
          </Menu.Item>
            <Dropdown
              text={this.props.parkDesignation}
              pointing className='link item'
              options={options}
              onChange={ (e) => this.props.handleDesignationFilter(e)}
              selectOnBlur={false}
            />
          <Menu.Item position='right'>Login</Menu.Item>
        </Menu>
      </Sticky>

    )
  }
}
