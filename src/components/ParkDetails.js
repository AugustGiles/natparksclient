import React, { Component } from 'react';
import { Modal, Header, Image } from 'semantic-ui-react'

class ParkDetails extends Component {
    state={
        parkInfo:{},
        imageIndex: 0
    }

    
    componentDidMount(){
        let parkIndex = this.props.match.params.park
        fetch(`https://still-wildwood-14519.herokuapp.com/parks/${parkIndex}`)
        .then(res=>res.json())
        .then(parkInfo=>this.setState({parkInfo:parkInfo},this.setImageScroll))
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
                    </Modal.Description>
                </Modal.Content>
        </React.Fragment>  );
    }
}
 
export default ParkDetails;