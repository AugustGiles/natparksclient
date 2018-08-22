import React, { Component } from 'react'
import "../css/NavBar.css";
import { Menu, Search, Dropdown } from 'semantic-ui-react'
import ReactTooltip from "react-tooltip"

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
    const {handleDesignationFilter, history} = this.props

    return (
      <div className="NavBar"
        style={this.props.theme==='light'?{backgroundColor:'white'}:{backgroundColor:'#202124'}}>
        <Menu secondary size='huge' stackable>
          <Menu.Item header
              style={this.props.theme==='light'?{color:'black'}:{color:'white'}}>
            Parks Map
          </Menu.Item>
          <Menu.Item
            >
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={this.handleSearchChange}
              results={results}
              value={value}
            />
          </Menu.Item>
            <Dropdown
              style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
              text={this.props.parkDesignation}
              pointing className='link item'
              options={options}
              onChange={ (e) => handleDesignationFilter(e)}
              selectOnBlur={false}
            />
          <Menu.Item
            icon="question circle outline"
            data-tip
            data-for='instructions'
            style={{textAlign: 'left'}}
            />
          <ReactTooltip id='instructions'>

              <span>Double click on states to zoom in.</span><br/>
              <span>Click on park marker to see details.</span><br/>
              <span>Create an account to keep up to date with your favorite parks.</span><br/>

          </ReactTooltip>
          {!this.props.loggedIn  ?
            <Menu.Menu position='right'>
              <Menu.Item
                style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
                 onClick={()=>history.push('/login')}>Login</Menu.Item>
              <Menu.Item
                style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
               onClick={()=>history.push('/signup')} >Signup</Menu.Item>
            </Menu.Menu>
            :
            <Menu.Menu position='right'>
              <Menu.Item
                style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
                onClick = {this.props.handleExtendSidebar}>
                {this.props.sidebarVisible ? "Hide Info" : "My Info"}
              </Menu.Item>
              <Menu.Item
                style={this.props.theme==='light'?{color:'black'}:{color:'white'}}
                onClick = {this.props.logoutUser}
                >
                Logout</Menu.Item>
            </Menu.Menu>
          }
        </Menu>
      </div>

    )
  }
}
