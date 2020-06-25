var map; //Mapa
var marker; // Marcadores
var coor; // Coordenadas
var image; // Icono de marcador
var poly; // Polyline
var path;
var array = new Array(); // Array con los datos de captura
// carga al terminar carga del documento
document.addEventListener('DOMContentLoaded', () => {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: 'terrain'
    });

    // Define the LatLng coordinates for the polygon.
    var triangleCoords = [
        { lat: 25.774, lng: -80.190 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 }
    ];

    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);

    // Add a listener for the click event.
    bermudaTriangle.addListener('click', dentroDelArea);
    map.addListener('click', fueraDelArea);
});

function dentroDelArea(e) {
    alert('ESTA DENTRO DEL AREA');
}

function fueraDelArea(e) {
    alert('ESTA FUERA DEL AREA');
}