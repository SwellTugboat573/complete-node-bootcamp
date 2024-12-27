// import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';
// DOM ELEMENTS
const mapbox = document.getElementById('map');
const loginForm = document.querySelector('.form');

//values

// delegation
if (mapbox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  displayMap(locations);
}
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
