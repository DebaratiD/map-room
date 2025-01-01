import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { socket } from '../apis/Socket';


function MyMapComponent({mapid, lat, long}){
  const API_KEY = 'rMiiapJoAS7kCb9pEikQ';
  const mapContainer = useRef(null);
  const map = useRef(null);
  //const [map, setmap] = useState({});
  // const map = new maplibregl.Map({
  //           container: 'map', // container id
  //           style: 'https://demotiles.maplibre.org/style.json', // style URL
  //           center: [long, lat], // starting position [lng, lat]
  //           zoom: 1 // starting zoom
  // });

  useEffect(()=>{
    if (map.current) return; // stops map from intializing more than once
  
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [long, lat],
      zoom: 11
    });

    const marker = new maplibregl.Marker()
        .setLngLat([long, lat])
        .addTo(map.current);

    navigator.geolocation.watchPosition((position)=>{
      if(position.coords.latitude!=lat || position.coords.longitude!=long){
        lat = position.coords.latitude;
        long = position.coords.longitude;
        socket.emit("updateLocation",{mapId:mapid, userID:localStorage.getItem("userID"), lat:lat,long:long});}
    },
    (error)=>{
      console.log("Could not access location");
    })
  },[API_KEY, long, lat]);


      return (
        
          <div ref={mapContainer} className="map"/>

      );
}

export default MyMapComponent;