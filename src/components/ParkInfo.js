import React, { Component } from 'react';
import { Modal, Header, Loader } from 'semantic-ui-react'


class ParkInfo extends Component {

    render() { 
        const {parkInfo, loading} = this.props
        return (
        <React.Fragment>
            {loading?<Loader />:
                <React.Fragment>
                    <Header>{parkInfo.designation}</Header>
                    <Header>Description:</Header>
                    <p>{parkInfo.description}</p>
                    {parkInfo.weather_info!=="" && 
                        <p>{parkInfo.weather_info}</p>
                    }   
                    <a href={parkInfo.url} target="_blank">Park Website</a>
                </React.Fragment>}
        </React.Fragment>  );
    }
}
 
export default ParkInfo;