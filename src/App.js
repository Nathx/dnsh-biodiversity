import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1IjoibmF0azciLCJhIjoiY2t5dmc0anBpMHk4bzJybzhkdGg0MHdzdCJ9.nTfTTvKc1T0IQeIZocIOQA';

export default function App() {
	// defaults
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(10.4515);
	const [lat, setLat] = useState(51.1657);
	const [zoom, setZoom] = useState(5);

	useEffect(() => {
	if (map.current) return; // initialize map only once
	map.current = new mapboxgl.Map({
	  container: mapContainer.current,
	  style: 'mapbox://styles/natk7/ckyvg82kk003b14n1tuq11p21',
	  center: [lng, lat],
	  zoom: zoom
	});
	map.current.addControl(
		new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		})
	);
	});

	useEffect(() => {
	if (!map.current) return; // wait for map to initialize
	map.current.on('move', () => {
	  setLng(map.current.getCenter().lng.toFixed(4));
	  setLat(map.current.getCenter().lat.toFixed(4));
	  setZoom(map.current.getZoom().toFixed(2));
	});
	});

  return (
    <div>

      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}