import React, { Component } from 'react';
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
  } from "react-simple-maps"

  import {geoAlbersUsa} from "d3-geo";
  import { Motion, spring } from "react-motion";

  import "../css/Map.css";
  import {parks} from "../data/Parks";
  import {states, selectedStyle, defaultStyle, stateStyles} from "../data/States";



class Map extends Component {
  constructor() {
    super()
    this.state = {
      center: [ -97, 40 ],
      zoom: 1,
      selectedState: null,
      stateStyles: stateStyles
    }
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
    
    render() { 
        return (
            <div className="map-container">
            <Motion
          defaultStyle={{
            zoom: 1,
            x: -97,
            y: 40,
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
          }}
          >
          <ZoomableGroup center={[x,y]} zoom={zoom} disablePanning>
                        <Geographies disableOptimization={true} geography='/gadm36_USA.json'>
                        {(geographies, projection) => {
                             let geos = geographies.map((geography, i) =>{
                               let stateName = geography.properties.VARNAME_1.slice(0,2)
                             return <Geography
                                onClick={()=>this.handleStateClick(stateName)}
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
                        <Marker
                            
                            marker={{coordinates: [-153.2917758, 67.75961636]}}
                            style={{
                                default: { fill: "#FF5722" },
                                hover: { fill: "#FFFFFF" },
                                pressed: { fill: "#FF5722" },
                            }}
                            >
                            <circle
                                cx={0}
                                cy={0}
                                r={5}
                                style={{
                                stroke: "#FF5722",
                                strokeWidth: 3,
                                opacity: 0.9,
                                }}
                            />
                        </Marker>
                        </Markers>
                    </ZoomableGroup>
                </ComposableMap>
                )}
                </Motion>
            </div>
          );
    }
}
 
export default Map;