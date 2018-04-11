import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import httpClient from '../httpClient.js'


const apiKey = "AIzaSyB0eMTL9hnGmaifNZOTiuRNJxNCOpOhBoc"
const style =  {
    width: '1000px',
    height: '600px'
}


export class MapContainer extends React.Component {

    state = {
        location: null
    }

    componentDidMount() {
        httpClient.getLocation().then((serverResponse) => {
            this.setState({
                location: serverResponse.data.results[0].geometry.location
            })
        })
    }
    
  render() {
      if(!this.state.location) return <h1>Loading...</h1>
    return (
      <Map  google={this.props.google}
      style={style}
      initialCenter={{
        lat: this.state.location.lat,
        lng: this.state.location.lng
      }}
      zoom={15}
      onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
