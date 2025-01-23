import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { socket } from '../apis/Socket';


function MyMapComponent({mapid, lat, long}){
  const API_KEY = 'rMiiapJoAS7kCb9pEikQ';
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [Lat, setLat] = useState(lat);
  const [Long, setLong] = useState(long);
  const [markers, setMarkers] = useState<maplibregl.Marker[]>([]);
  //const [map, setmap] = useState({});
  // const map = new maplibregl.Map({
  //           container: 'map', // container id
  //           style: 'https://demotiles.maplibre.org/style.json', // style URL
  //           center: [long, lat], // starting position [lng, lat]
  //           zoom: 1 // starting zoom
  // });

  useEffect(()=>{
    if (map.current) return; // stops map from intializing more than once
    console.log(Lat, Long);
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [Long,Lat],
      zoom: 11
    });

    const marker = new maplibregl.Marker()
        .setLngLat([Long, Lat])
        .addTo(map.current);
  },[API_KEY]);

  
  useEffect(()=>{    
    navigator.geolocation.watchPosition((position)=>{
      if(position.coords.latitude!=Lat || position.coords.longitude!=Long){
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        //console.log(map.current);
       // socket.emit("updateLocation",{mapId:mapid, userID:localStorage.getItem("userID"), lat:Lat,long:Long});
        }
    },
    (error)=>{
      console.log("Could not access location");
    })
  },[setLat, setLong]);


      return (
        
          <div ref={mapContainer} className="map"/>

      );
}

export default MyMapComponent;