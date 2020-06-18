import React, { useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import Geocode from "react-geocode";
const GmpsApiKey = process.env.REACT_APP_GMAPS_API_KEY

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(GmpsApiKey);
// set response language. Defaults to english.
Geocode.setLanguage("en");
// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("mx");
// Enable or disable logs. Its optional.
Geocode.enableDebug();
 
const Map = (props) => {
  const [mop, setMop] = useState('')
  const [mark, setMark] = useState('')
  const [position, setPosition] = useState({ lat: 19.492814, lng: -99.082067 })
  const onPositionChanged = (event) => {
    /*
      Get address from latidude & longitude.
    */
    Geocode.fromLatLng(event.latLng.lat(), event.latLng.lng()).then(
      response => {
        let data = {}
        if (response.results[0].address_components[6] && response.results[0].address_components[6].types.includes('postal_code') && response.results[0].address_components[6].long_name) {
          data.cp = response.results[0].address_components[6].long_name
        } else if (response.results[0].address_components[7] && response.results[0].address_components[7].types.includes('postal_code') && response.results[0].address_components[7].long_name) {
          data.cp = response.results[0].address_components[7].long_name
        } else {
          data.cp = ''
        }
        setPosition({lat: event.latLng.lat(), lng: event.latLng.lng()})
        data = {
          ...data,
          address: response.results[0].formatted_address,
          exterior: response.results[0].address_components[0].long_name ? response.results[0].address_components[0].long_name : '',
          street: response.results[0].address_components[1].long_name ? response.results[0].address_components[1].long_name : '',
          neighborhood: response.results[0].address_components[2].long_name ? response.results[0].address_components[2].long_name : '',
          state: response.results[0].address_components[3].long_name ? response.results[0].address_components[3].long_name : '',
          municipio: response.results[0].address_components[5].long_name ? response.results[0].address_components[5].long_name : '',
          position: position
        }
        props.getUbicacion(data)
      },
      error => {
        console.error(error);
      }
    );
  }
  return(
    <GoogleMap
      ref={(map) => {
        setMop(map)
      }}
      defaultZoom={ 16 }
      defaultCenter={ position }
    >
      <Marker position={ position } ref={(mark) =>  {
        setMark(mark)
      }} draggable={true} onDragEnd={onPositionChanged} />
    </GoogleMap>
  );
}

export default withScriptjs(
  withGoogleMap(
    Map
  )
)