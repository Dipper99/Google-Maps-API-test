var map; //Mapa
var coor; // Coordenadas
var image; // Icono de marcador
var con;
var markers = new Array(); // Marcadores
var locationArray = new Array(); // Nuevo Array con los datos de captura
var poly = new Array();

var polyLine = new google.maps.Polyline(); // Inicializar Polyline
var polygon = new google.maps.Polygon(); //Inicializar Polygon
// carga al terminar carga del documento
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Mapa
    map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 15,
        center: new google.maps.LatLng(-12.1645719, -77.0275809),
        mapTypeId: 'terrain'
    });
    polyLine.setMap(map);
    // Agregar listener para eventos 
    map.addListener('click', addToArray);
});

/* FUNCIONES */
function addToArray(e) {
    var infoLocation = {
        len: locationArray.length, //Capturar Posicion
        lat: e.latLng.lat(), //Capturar Latitud
        lng: e.latLng.lng(), //Capturar Longitud
    };
    locationArray.push(infoLocation); // Agregar Location al array
    addMarker();
    addLocationToTable();
}

function deleteToArray(e) {
    locationArray = locationArray.filter(obj => obj.len !== e);
    addMarker();
    addLocationToTable();
}

function addMarker() {
    if (con) { return; }
    var marker = new google.maps.Marker();
    markers = [];
    locationArray.forEach(x => {
        marker.setPosition({ lat: x.lat, lng: x.lng });
        markers.push(marker); // Almacenar marcadores
    });
    markers.forEach(e => { e.setMap(map) });
}

function addPolyLine() {
    if (con) { return; }
    var path = polyLine.getPath();
    console.log(path);
    /*
    locationArray.forEach(e => {
        path.push(new google.maps.LatLng(e.lat, e.lng));
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(e.lat, e.lng),
            title: '#' + path.getLength(),
            map: map
        });
    });
    */
}

function addLocationToTable() {
    let location = document.getElementById('location'); // Seleccionando Table 
    let row = location.querySelectorAll("tr"); // Seleccionando Fila
    row.forEach(e => { location.removeChild(e) }) // Eliminando Filas de la tabla
    locationArray.forEach((e) => {
        // CREANDO ELEMENTOS TABLA
        let tr = document.createElement('tr'); // crear fila
        let tdInd = document.createElement('td'); // crear celda index
        let tdLat = document.createElement('td'); // crear celda latitud
        let tdLng = document.createElement('td'); // crear celda longitud
        let tdAcc = document.createElement('td'); // crear celda acciones
        location.appendChild(tr); // agregar fila
        tr.appendChild(tdInd); // agregar Celda
        tr.appendChild(tdLat); // agregar Celda
        tr.appendChild(tdLng); // agregar Celda
        tr.appendChild(tdAcc); // agregar Celda
        tdInd.innerHTML = e.len; // agregar Indice
        tdLat.innerHTML = e.lat.toFixed(5); // agregar Latitud
        tdLng.innerHTML = e.lng.toFixed(5); // agregar Longitud
        tdAcc.innerHTML = `<a id="remove" type="button" class="btn btn-link btn-sm" onclick="deleteToArray(${e.len})"><i class="fas fa-eraser"></i></a>`;
    });
}

function confirmClosePolyline() {
    con = confirm('CREAR POLIGONO');
    if (con) {
        polygon.setPaths(locationArray);
        polygon.setMap(map);
        polygon.addListener('click', dentroDelArea);
        map.addListener('click', fueraDelArea);
    }
}

function dentroDelArea() {
    alert('ESTA DENTRO DEL AREA');
}

function fueraDelArea() {
    alert('ESTA FUERA DEL AREA');
}
