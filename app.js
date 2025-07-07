const form = document.getElementById('form');
const btn = document.getElementById('btn');
const ipInput = document.getElementById('ipAddress');

// Initialise map
var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Add pointer (marker)
var marker = L.marker([51.505, -0.09]).addTo(map);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ip = ipInput.value.trim();

    if(ip === ""){
        alert('Please enter a valid ip address');
        return;
    }

    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_A3Lg2RWCoVXImjGLq9sHzbWIhglYn&ipAddress=${ip}`;

    console.log("Fetching IP:", ip);
    console.log("URL:", apiUrl);

    fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then((data) => {
        // Update UI
        document.getElementById('ipResult').innerHTML = data.ip;
        document.getElementById('city').innerHTML = data.location.city;
        document.getElementById('region').innerHTML = data.location.region;
        document.getElementById('country').innerHTML = data.location.country;
        document.getElementById('timezone').innerHTML = data.location.timezone;
        document.getElementById('isp').innerHTML = data.isp;

        // Move the map and marker
        const lat = data.location.lat;
        const lng = data.location.lng;

        map.setView([lat, lng], 13); // Move map to new location
        marker.setLatLng([lat, lng]); // Move the existing marker
    })
    .catch((error) => {
        console.error('Error fetching IP data:', error);
    });
});

