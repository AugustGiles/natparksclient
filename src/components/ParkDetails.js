import React, { Component } from 'react';
import { Modal, Header, Image, Button } from 'semantic-ui-react'

class ParkDetails extends Component {
    state={
        parkInfo:{},
        imageIndex: 0
    }

    
    componentDidMount(){
        let parkId = this.props.match.params.park
        // Fetch park show page
        fetch(`https://still-wildwood-14519.herokuapp.com/parks/${parkId}`)
        .then(res=>res.json())
        .then(parkInfo=>this.setState({parkInfo:parkInfo},this.setImageScroll))

        // Fetch alerts
        fetch(`https://still-wildwood-14519.herokuapp.com/parks/${parkId}/alerts`)
        .then(res=>res.json())
        .then(console.log)

        // Fetch Events
        fetch(`https://still-wildwood-14519.herokuapp.com/parks/${parkId}/events`)
        .then(res=>res.json())
        .then(console.log)
    }

    setImageScroll = () => {
        if (this.state.parkInfo.image_sources.length>1)
        this.interval = setInterval(()=>{
            let nextImageIndex = this.state.imageIndex + 1
            if (nextImageIndex > this.state.parkInfo.image_sources.length-1) {
                nextImageIndex = 0
            }
		    this.setState({
			    imageIndex: nextImageIndex
		    })
        },3000)
    }


    handleUserFollowPark = () => {
        fetch(`https://still-wildwood-14519.herokuapp.com/follow/${this.state.parkInfo.id}`, 
        {method:"POST",
        headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        
      });
    }
  

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render() { 
        const {parkInfo} = this.state
        return (
        <React.Fragment >
            <Modal.Header>{parkInfo.full_name}</Modal.Header>
                <Modal.Content image scrolling>
                    {parkInfo.image_sources &&
                        <Image wrapped size="massive" src={parkInfo.image_sources[this.state.imageIndex]}/>}
                    <Modal.Description>
                        <Header>{parkInfo.designation}</Header>
                        <Header>Description:</Header>
                        <p>{parkInfo.description}</p>
                        {parkInfo.weather_info!=="" && 
                            <p>{parkInfo.weather_info}</p>
                        }   
                        <a href={parkInfo.url} target="_blank">Park Website</a>
                        {this.props.loggedIn && <Button onClick={this.handleUserFollowPark}>Follow Park</Button>}
                    </Modal.Description>
                </Modal.Content>
        </React.Fragment>  );
    }
}
 
export default ParkDetails;