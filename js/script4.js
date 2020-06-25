/* VARIABLES DE GOOGLE */
var mapa;
var marker = new google.maps.Marker();
/* FIN VARIABLES DE GOOGLE */
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
document.addEventListener('DOMContentLoaded', () => {
    mapa = new google.maps.Map(document.querySelector('#map'), {
        zoom: 12,
        center: new google.maps.LatLng(-12.1645719, -77.0275809)
    });
    navigator.geolocation.getCurrentPosition(success, error, options);
    var autocomplete = document.getElementById("autocomplete");
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo("bounds", mapa);
});

const success = (pos) => {
    let crd = pos.coords;
    let myPosition = {
        lat: crd.latitude,
        lng: crd.longitude
    };
    console.log('Tu posición actual es:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`Más o menos ${crd.accuracy} metros.`);
    marker.setPosition(myPosition);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    marker.setMap(mapa);
    mapa.setCenter(myPosition);
    mapa.setZoom(20);
    return myPosition;
}

const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}