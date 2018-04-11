import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper, Google} from 'google-maps-react';

const apiKey = "AIzaSyB0eMTL9hnGmaifNZOTiuRNJxNCOpOhBoc"
const style =  {
    width: '1000px',
    height: '600px'
}


export class MapContainer extends React.Component {

    state = {
        location: null
        // location: {
        //     lat: 40.854885,
        //     lng: -88.081807
        // }
    }

//     latLong (city){
//         var geocoder =  new google.maps.Geocoder();
//         geocoder.geocode( { 'address': city}, function(results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng()); 
//       } else {
//         alert("Something got wrong " + status);
//       }
//     });
// }
    
  render() {
      console.log(this.props.currentUser)
    //   console.log(this.latLong("san francisco"))
      if(!this.state.location) return <h1>Loading...</h1>
    return (
      <Map  google={this.props.google}
      style={style}
      center={{
        lat: 40.854885,
        lng: -88.081807
      }}
      zoom={15}
      onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.location}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer)
