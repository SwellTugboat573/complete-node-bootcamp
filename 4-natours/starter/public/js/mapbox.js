/* esling-disable */
console.log('hello from the client side');

const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);
mapboxgl.accessToken =
  'pk.eyJ1IjoiemFjc3VtbWVyczU3MyIsImEiOiJjbTRpc2s2aTkwMzZrMmpwdTkxZzNvYWI3In0.4X7JCibYW3F5Ve5NdNnPcw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/zacsummers573/cm4iuhbq401g801sl4fdu5f8b',
  scrollZoom: false,
  // style URL
  // center: [-118.113491, 34.111745], // starting position [lng, lat]
  // zoom: 9, // starting zoom
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //Create market
  const el = document.createElement('div');
  el.className = 'marker';
  // Add the market
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);
  //add popup

  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: { top: 200, bottom: 150, left: 100, right: 100 },
});
