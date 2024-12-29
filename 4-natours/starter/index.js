var $knI9B$axios = require("axios");
var $knI9B$axiosdistbrowseraxioscjs = require("axios/dist/browser/axios.cjs");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
// import '@babel/polyfill';

/* eslint-disable */ const $c67cb762f0198593$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $c67cb762f0198593$export$de026b00723010c1 = (type, msg, time = 7)=>{
    $c67cb762f0198593$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($c67cb762f0198593$export$516836c6a9dfc573, time * 1000);
};


const $70af9284e599e604$export$596d806903d1f59e = async (email, password)=>{
    console.log(email, password);
    try {
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            (0, $c67cb762f0198593$export$de026b00723010c1)('success', 'Logged in successfully!');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        console.log(err);
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', err.response?.data?.message);
    }
};
const $70af9284e599e604$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/users/logout'
        });
        res.data.status = 'success'; // true allows it to be reloaded from the server and not cache.
        location.reload(true);
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', 'Error logging out! Try again.');
    }
};


const $f60945d37f8e594c$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = 'pk.eyJ1IjoiemFjc3VtbWVyczU3MyIsImEiOiJjbTRpc2s2aTkwMzZrMmpwdTkxZzNvYWI3In0.4X7JCibYW3F5Ve5NdNnPcw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/zacsummers573/cm4iuhbq401g801sl4fdu5f8b',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        //Create market
        const el = document.createElement('div');
        el.className = 'marker';
        // Add the market
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
        //add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description} </p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};


/* eslint-disable */ 

const $936fcc27ffb6bbb1$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? 'http://localhost:3000/api/v1/users/updateMyPassword' : 'http://localhost:3000/api/v1/users/updateMe';
        const res = await (0, ($parcel$interopDefault($knI9B$axios)))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') (0, $c67cb762f0198593$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        (0, $c67cb762f0198593$export$de026b00723010c1)('error', err.response.data.message);
    }
};


// const axios = require('axios');
// const axios = require('axios');

const $6710bca62beba915$export$8d5bdbf26681c0c2 = async (tourId)=>{
    // 1) get checkout session
    const session = await $knI9B$axiosdistbrowseraxioscjs.get(`https://localhost/api/v1/bookings/checkout-sessions/${tourId}`);
    console.log(session);
// 2) Creat checkiout Form + Charge credit card
};


// DOM ELEMENTS
const $d0f7ce18c37ad6f6$var$mapbox = document.getElementById('map');
const $d0f7ce18c37ad6f6$var$loginForm = document.querySelector('.form--login');
const $d0f7ce18c37ad6f6$var$logOutBtn = document.querySelector('.nav__el--logout');
const $d0f7ce18c37ad6f6$var$userDataForm = document.querySelector('.form-user-data');
const $d0f7ce18c37ad6f6$var$userPasswordForm = document.querySelector('.form-user-password');
const $d0f7ce18c37ad6f6$var$bookBtn = document.getElementById('book-tour');
// delegation
if ($d0f7ce18c37ad6f6$var$mapbox) {
    const locations = JSON.parse(document.getElementById('map').dataset.locations);
    (0, $f60945d37f8e594c$export$4c5dd147b21b9176)(locations);
}
if ($d0f7ce18c37ad6f6$var$loginForm) $d0f7ce18c37ad6f6$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, $70af9284e599e604$export$596d806903d1f59e)(email, password);
});
if ($d0f7ce18c37ad6f6$var$logOutBtn) $d0f7ce18c37ad6f6$var$logOutBtn.addEventListener('click', (0, $70af9284e599e604$export$a0973bcfe11b05c9));
if ($d0f7ce18c37ad6f6$var$userDataForm) $d0f7ce18c37ad6f6$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]); // the files is an array
    console.log(form);
    (0, $936fcc27ffb6bbb1$export$f558026a994b6051)(form, 'data');
});
if ($d0f7ce18c37ad6f6$var$userPasswordForm) $d0f7ce18c37ad6f6$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating ...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, $936fcc27ffb6bbb1$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});
if ($d0f7ce18c37ad6f6$var$bookBtn) $d0f7ce18c37ad6f6$var$bookBtn.addEventListener('click', (e)=>{
    e.target.textContent = 'Processing...';
    const { tourId: tourId } = e.target.dataset;
    (0, $6710bca62beba915$export$8d5bdbf26681c0c2)(tourId);
});


//# sourceMappingURL=index.js.map
