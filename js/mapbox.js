mapboxgl.accessToken = 'pk.eyJ1Ijoid3VndW9qaWEiLCJhIjoiY2sxaHJrdHBkMGRzejNodGYzemd1dmx4ayJ9.8fy2i8p8CNdh3mf44AlZDg';
		let map = new mapboxgl.Map({
			style: 'mapbox://styles/mapbox/light-v10',
			center: [-74.0066, 40.7135],
			zoom: 15.5,
			pitch: 45,
			bearing: -17.6,
			container: 'map'
		});
		map.on('load', function() {
// Insert the layer beneath any symbol layer.
			let layers = map.getStyle().layers;
			let labelLayerId;
			for (let i = 0; i < layers.length; i++) {
				if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
					labelLayerId = layers[i].id;
					break;
				}
			}
			map.addLayer({
				'id': '3d-buildings',
				'source': 'composite',
				'source-layer': 'building',
				'filter': ['==', 'extrude', 'true'],
				'type': 'fill-extrusion',
				'minzoom': 15,
				'paint': {
					'fill-extrusion-color': '#aaa',
					
					// use an 'interpolate' expression to add a smooth transition effect to the
					// buildings as the user zooms in
					'fill-extrusion-height': [
					"interpolate", ["linear"], ["zoom"],
					15, 0,
					15.05, ["get", "height"]
					],
					'fill-extrusion-base': [
					"interpolate", ["linear"], ["zoom"],
					15, 0,
					15.05, ["get", "min_height"]
					],
					'fill-extrusion-opacity': .6
				}
			}, labelLayerId);
		});
	