mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFtYW5lamEyMDAyIiwiYSI6ImNsYmh3Y2ppZDB0dGkzbnJyNHR6eWV1bjgifQ.RXIqxhkj6Ty7ucpLmWZT8Q';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: campground.geometry.coordinates,
zoom: 8
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5>${campground.title}</h5><p>${campground.location}</p>`
            )
    )
    .addTo(map)


map.addControl(new mapboxgl.NavigationControl());