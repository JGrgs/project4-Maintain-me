import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, GoogleMapReact} from 'google-maps-react'
import httpClient from '../httpClient.js'


const apiKey = "AIzaSyB0eMTL9hnGmaifNZOTiuRNJxNCOpOhBoc"
const style =  {
    width: '1000px',
    height: '600px'
}


export class MapContainer extends React.Component {

    state = {
        location: null,
        businesses: {
            name: [],
            coordinates: {
                latitude: [],
                longitude: []
            }
        }
    }

    componentDidMount() {
        httpClient.getLocation().then((serverResponse) => {
            this.setState({
                location: serverResponse.data.results[0].geometry.location
            })
        })

        httpClient.getBusinesses().then((serverResponse) => {
            const businessesName = serverResponse.data.map((b) => {
                return b.name
            })
            const businessesCoordinates = serverResponse.data.map((b) => {
                return b.coordinates
            })
            this.setState({
                businesses: {
                    name: businessesName,
                    coordinates: businessesCoordinates
                }
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
        { this.state.businesses.name.map((b,i) => {
            console.log(this.state.businesses.coordinates[i].latitude, this.state.businesses.coordinates[i].longitude)
            const lat = this.state.businesses.coordinates[i].latitude
            const lng = this.state.businesses.coordinates[i].longitude
            return (
                <Marker
                    key={i}

                    name={b}
                    
                    position={{lat: this.state.businesses.coordinates[i].latitude,
                    lng:this.state.businesses.coordinates[i].longitude}}
                    />
                
            )
        })}
        <Marker position={{lat: this.state.location.lat, lng: this.state.location.lng}} />
    </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
