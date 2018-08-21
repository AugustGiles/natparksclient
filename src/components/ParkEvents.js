import React, { Component } from 'react';
import { Loader, Message } from 'semantic-ui-react'


class ParkEvents extends Component {

    renderEvents = () => {
        return this.props.events.map(event=>
             <Message key={event.id}>
                  <Message.Header>{event.title}</Message.Header>
                <p><strong>Date(s): {this.formatDates(event.dates)}</strong></p>
                <p><strong>Time: {event.time}</strong></p>
                <p>
                    {event.abstract}    
                </p>
                <p><a href={event.url} target="_blank">Event Link</a></p>
             </Message>
        )
    }

    formatDates = (dates) => {
        let dateArray = dates.split(',')
        return dateArray.map(dateString=>{
            let date = new Date(dateString)
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        }).join(', ')
    }

    render() { 
        const {events, loading} = this.props
        return (
            <React.Fragment>
                {loading?<Loader />:
                <React.Fragment>
                    {events.length>0?this.renderEvents():"There are currently no Events for this Park"}
                </React.Fragment>}
            </React.Fragment>  );
    }
}
 
export default ParkEvents;