import React, { Component } from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
  } from "react-simple-maps"

  import { Button } from "semantic-ui-react";

  import ReactTooltip from "react-tooltip";

  import {geoAlbersUsa} from "d3-geo";
  import { Motion, spring } from "react-motion";

  import "../css/Map.css";
  import {states, selectedStyle, defaultStyle, stateStyles} from "../data/States";



class Map extends Component {
  constructor() {
    super()
    this.state = {
      center: [ -97, 38 ],
      zoom: 1,
      selectedState: null,
      stateStyles: stateStyles
    }
  }

  handleZoom = () => {
    if(this.state.zoom === 1)
      this.setState({zoom:2})
    else
      this.resetMap()
  }

  resetMap = () => {
    this.setState({
      center: [ -97, 38 ],
      zoom: 1,
      selectedState: null,
      stateStyles: stateStyles
    })
  }

  handleStateClick = (stateName) =>{
    // find previously clicked state if exists
    if (this.state.selectedState) {
      let stateStylesCopy = {...this.state.stateStyles}
      stateStylesCopy[this.state.selectedState] = defaultStyle
      stateStylesCopy[stateName] = selectedStyle
      this.setState({
        selectedState: stateName,
        stateStyles: stateStylesCopy,
        ...states[stateName]
      })
    }
    // No previous state
    else{
      let stateStylesCopy = {...this.state.stateStyles}
      stateStylesCopy[stateName] = selectedStyle
      this.setState({
        selectedState: stateName,
        stateStyles: stateStylesCopy,
        ...states[stateName]
      })
    }
  }

  renderMarkers = () => {
    const {parkData} = this.props
    return (
      parkData.map(park =>{
          return this.renderMarker(park)
        }
      )
    )
  }

  renderMarker = (park) => {
    return <Marker
          key = {`marker-${park.id}`}
          onClick={()=>this.props.history.push(`/${park.id}`)}
          marker={{coordinates:
            [
              parseFloat(park.coordinates[0]),
              parseFloat(park.coordinates[1])
            ]}}
          style={{
              default: { fill: "#2185d0" },
              hover: { fill: "#FFFFFF" },
              pressed: { fill: "#2185d0" },
          }}
          >
          <circle
              data-tip
              data-for={park.id}
              cx={0}
              cy={0}
              r={this.state.zoom<=5?this.state.zoom:this.state.zoom/2.5}
              style={{
              stroke: "#2185d0",
              strokeWidth: 3,
              opacity: 0.9,
              }}
          />
        </Marker>
  }

  renderTooltips = () => {
    const {parkData} = this.props

    return (
      parkData.map(park =>{
          return this.renderTooltip(park)
        }
      )
    )
  }

  renderTooltip = (park) => {
    return (<ReactTooltip key={`tooltip-${park.id}`} id={park.id.toString()}>
      <span>{park.full_name}</span>
    </ReactTooltip>)
  }

    render() {


        return (
            <div 
              className={this.props.sidebarVisible ? "map-container map-container-with-sidebar" : "map-container"} 
              style={this.props.theme==='light'?{backgroundColor:'#DAE0E6'}:{backgroundColor:'#2c2d32'}}
              >
            <Motion
          defaultStyle={{
            zoom: 1,
            x: -97,
            y: 38,
          }}
          style={{
            zoom: spring(this.state.zoom, {stiffness: 210, damping: 20}),
            x: spring(this.state.center[0], {stiffness: 210, damping: 20}),
            y: spring(this.state.center[1], {stiffness: 210, damping: 20}),
          }}
          >
          {({zoom,x,y}) => (
          <ComposableMap
          projection={geoAlbersUsa}
          projectionConfig={{ scale: 1000 }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
            overflow: "hidden"
          }}
          >
          <ZoomableGroup center={[x,y]} zoom={zoom}>
                        <Geographies disableOptimization={true} geography='/gadm36_USA.json'>
                        {(geographies, projection) => {
                             let geos = geographies.map((geography, i) =>{
                               let stateName = geography.properties.VARNAME_1.slice(0,2)
                             return <Geography
                                onDoubleClick={()=>this.handleStateClick(stateName)}
                                key={stateName}
                                geography={geography}
                                projection={projection}
                                style={this.state.stateStyles[stateName]}
                              />}
                            )
                            return geos
                        }}
                        </Geographies>
                        <Markers>
                          {this.props.parkData.length!==0 && this.renderMarkers()}
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
                )}
                </Motion>
                {this.props.parkData.length!==0 && this.renderTooltips()}
                <Button id="fab" circular icon={this.state.zoom ===1?"zoom in":"zoom out"} size="massive" color="blue" onClick={this.handleZoom}/>
                <Button id="theme-button" 
                    style={this.props.theme==='light'?
                      {backgroundColor:'#202124', color:'white'}:
                      {backgroundColor:'#DAE0E6', color: 'black'}} circular 
                    onClick={this.props.toggleTheme}>
                    {this.props.theme==='light'?'dark theme':'light theme'}
                </Button>
            </div>
          );
    }
}

export default Map;
