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
  import {states} from "../data/States";



class Map extends Component {
  constructor() {
    super()
    this.state = {
      center: [ -97, 40 ],
      zoom: 1,
      selectedState: null
    }
  }

  handleStateClick = (state) =>{
    let stateView = states[state]
    this.setState({...stateView, selectedState:state})
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
                        <Geographies  geography='/gadm36_USA.json'>
                        {(geographies, projection) =>
                             geographies.map((geography, i) =>{
                             return <Geography
                                onClick={()=>this.handleStateClick(geography.properties.VARNAME_1.slice(0,2))}
                                key={i}
                                geography={geography}
                                projection={projection}
                                style={{
                                  default: {
                                    fill: "#ECEFF1",
                                    stroke: "#607D8B",
                                    strokeWidth: 0.75,
                                    outline: "none",
                                  },
                                  hover: {
                                    fill: "#CFD8DC",
                                    stroke: "#607D8B",
                                    strokeWidth: 1,
                                    outline: "none",
                                  },
                                  pressed: {
                                    fill: "#FF5722",
                                    stroke: "#607D8B",
                                    strokeWidth: 1,
                                    outline: "none",
                                  }
                                }}
                              />}
                            )
                        }
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