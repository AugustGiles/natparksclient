import React, { Component } from 'react';
import { Loader, Message } from 'semantic-ui-react'


class ParkAlerts extends Component {

    renderAlerts = () => {
        return this.props.alerts.map(alert=>
             <Message key={alert.id}>
                  <Message.Header>{alert.title}</Message.Header>
                <p>
                    {alert.description}    
                </p>
             </Message>
        )
    }

    render() { 
        const {alerts, loading} = this.props
        return (
            <React.Fragment>
                {loading?<Loader />:
                <React.Fragment>
                    {alerts.length>0?this.renderAlerts():"There are currently no Alerts for this Park"}
                </React.Fragment>}
            </React.Fragment>  );
    }
}
 
export default ParkAlerts;