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
        showingInfoWindow: false,
        activeMarker: {},
        location: null,
        geoCodeLocation: null,
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
            console.log(serverResponse)
            this.setState({
                location: serverResponse.data.results[0].formatted_address,
                geoCodeLocation: serverResponse.data.results[0].geometry.location
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

    onMyMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true 
        })
    }

    onMarkerClick(props, marker, e){
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true 
        })
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };
    
  render() {
      if(!this.state.geoCodeLocation) return <h1>Loading...</h1>
    return (
      <Map  google={this.props.google}
      onClick={this.onMapClicked}
      style={style}
      initialCenter={{
        lat: this.state.geoCodeLocation.lat,
        lng: this.state.geoCodeLocation.lng
      }}
      zoom={14}
      onClick={this.onMapClicked}>
        { this.state.businesses.name.map((b,i) => {
            const lat = this.state.businesses.coordinates[i].latitude
            const lng = this.state.businesses.coordinates[i].longitude
            return (
                
                <Marker
                    key={i}

                    name={b}

                    onClick={this.onMarkerClick.bind(this)}
                    
                    position={{lat: lat,
                    lng: lng}}
                />
            )
            
        })}
           <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    {this.state.businesses.name.map((b, i) => {
                        return ( <div>
                        <h1>{b[i]}</h1>
                        </div> )
                    })}
                      
            </InfoWindow>
            
        <Marker 
            onClick={this.onMyMarkerClick.bind(this)} 

            name={"My Location"} 
            
            position={{lat: this.state.geoCodeLocation.lat, lng: this.state.geoCodeLocation.lng}} 
        />


        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
                <div>
                    <h1>{"My location"}</h1>
                </div>
        </InfoWindow>
    </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
