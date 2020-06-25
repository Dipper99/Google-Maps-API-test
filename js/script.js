var locations = [
    {
        name: 'Oficinas Delcorp',
        lat: -12.113997,
        lng: -77.0317551
    },
    {
        name: 'Cibertec',
        lat: -12.1222648,
        lng: -77.028291
    },
    {
        name: 'Ovalo La Curva',
        lat: -12.1844301,
        lng: -77.007694
    }
];
document.querySelector('#btn-cargar').addEventListener('click', () => {
    document.querySelector('#btn-cargar').remove();
    tableCoor();
});
function tableCoor() {
    let tbody = document.querySelector('.table>tbody');
    for (let i = 0; i < locations.length; i++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.innerText = i + 1;
        tr.appendChild(th);
        let tdn = document.createElement('td');
        tdn.innerText = locations[i].name;
        tr.appendChild(tdn);
        let tdb = document.createElement('td');
        tr.appendChild(tdb);
        let btn = document.createElement('button');
        btn.classList.add('btn');
        btn.classList.add('btn-outline-primary');
        btn.innerHTML = '<i class="fa fa-search"></i>';
        btn.setAttribute('onclick', `initMap(${i})`);
        tdb.appendChild(btn);
    }
}
var map; //Mapa
var marker; // Marcadores
var coor; // Coordenadas
// carga al terminar carga del documento
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Mapa
    map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 12,
        center: new google.maps.LatLng(-12.1645719, -77.0275809),
        streetViewControl: false,
        mapTypeId: 'roadmap'
    });
    // Colocar marcadores
    locations.forEach(function (location) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.lat, location.lng),
            map: map,
            //animation: google.maps.Animation.BOUNCE // Animacion
        });
    });
    map.addListener('rightclick', e => {
        marker.setPosition(e.latLng);
    });
    map.addListener('click', e => {
        marker = new google.maps.Marker({
            position: e.latLng,
            map: map,
            // animation: google.maps.Animation.BOUNCE // Animacion
        });
    });
});
function initMap(i) {
    coord = new google.maps.LatLng(locations[i].lat, locations[i].lng);
    map.setCenter(coord);
    map.setZoom(14);
}
