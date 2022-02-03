import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import Optionsfield from './components/Optionsfield';
import Legend from './components/Legend';

mapboxgl.accessToken = 'pk.eyJ1IjoibmF0azciLCJhIjoiY2t5dmc0anBpMHk4bzJybzhkdGg0MHdzdCJ9.nTfTTvKc1T0IQeIZocIOQA';

export default function App() {
	// defaults
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(10.4515);
	const [lat, setLat] = useState(51.1657);
	const [zoom, setZoom] = useState(5);

	const options = [
	    {
	      name: 'Key Biodiversity Areas',
	      description: 'Natura 2000 sites incl. 2 km buffer zones.',
	      layer: 'n2k-germany',
	      stops: [
	        ["Cropland", '#ecf240'],
	        ["Woodland and forest", '#3d840b'],
	        ["Grassland", '#e4bb07'],
	        ["Heathland and scrub", '#a4c73d'],
	        ["Open spaces with little or no vegetation", '#52ffb4'],
	        ["Wetland", '#b472ee'],
	        ["Water", '#294ffa']
	      ]
	    },
	    {
	      name: 'Soil carbon',
	      description: 'Organic carbon stored in soil (g C/kg), derived from LUCAS topsoil sample dataset.',
	      layer: 'organic_carbon',
	      stops: [
	        ["Moderate", '#ffaaaa'],
	        ["High", '#ff5555'],
	        ["Very high", '#ff0000'],
	      ]
	    },
	    {
	      name: 'Forestry',
	      description: 'Tree cover detected from satellite imagery.',
	      layer: 'forest_types',
	      stops: [
	        ["Tree Cover", '#22751e']
	      ]
	    }
    ];
  const [active, setActive] = useState(options[0]);
  const eligibility_tmpl = '<strong> Address eligibility</strong>';

  function assess_eligibility(e) {
  	var pointer_results = map.current.queryRenderedFeatures(
				e.result.center,
				{'layers': options.map(
				function (option) {
					return option.layer
				}
			)}
		);

		var elig_checks = [];

		for (const option of options) {
			var res = {
				layer: option.layer,
				name: option.name,
				eligibility: true
			};

			for (const r of pointer_results) {
				console.log(res.layer);
				if (r.layer.id === res.layer) {
					res.eligibility = false;
				}
			};
			elig_checks.push(res);
		}

		return elig_checks;
	};

	useEffect(() => {
		if (map.current) return; 
		// initialize map only once
		map.current = new mapboxgl.Map({
		  container: mapContainer.current,
		  style: 'mapbox://styles/natk7/ckyvg82kk003b14n1tuq11p21',
		  center: [lng, lat],
		  zoom: zoom
		});

		var geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl
		});

		// Adding search box for addresses.
		map.current.addControl(geocoder);

		geocoder.on('result', e => {

	      var eligibility =  eligibility_tmpl;
	      var results = assess_eligibility(e);
	      console.log(results);
	      for (const r of results) {
	      	eligibility += '<li>' + r.name + ': ' + (r.eligibility ? 'Eligible' : 'Non-eligible') + '</li>';
	      }
				
				new mapboxgl.Popup()
					.setLngLat(e.result.center)
					.setHTML(eligibility)
					.addTo(map.current);
				
		});

		map.current.on('load', () => {
			for (const option of options) {
				if (active !== option) {
					map.current.setLayoutProperty(option.layer, 'visibility', 'none');
				}
			};
		})
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on('move', () => {
		  setLng(map.current.getCenter().lng.toFixed(4));
		  setLat(map.current.getCenter().lat.toFixed(4));
		  setZoom(map.current.getZoom().toFixed(2));
		});
	});

	const changeState = i => {
		setActive(options[i]);
		for (let j = 0; j < options.length; j++) {
			if (i === j) {
				map.current.setLayoutProperty(options[j].layer, 'visibility', 'visible');
			}
			else {
				map.current.setLayoutProperty(options[j].layer, 'visibility', 'none');

			}
		};
    };

  return (
    <div>
        <header className="app-header">
          <h1>
            Construction project validation against the DNSH Biodiversity criteria (<a href="https://ec.europa.eu/sustainable-finance-taxonomy/activities/activity_en.htm?reference=7.1">EU Taxonomy</a>).
          </h1>
          Type in an address in the search box to validate the eligibility of a given building.
        </header>
      <div ref={mapContainer} className="map-container" />
      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options}
        layer={active.layer}
        changeState={changeState}
      />
    </div>
  );
}