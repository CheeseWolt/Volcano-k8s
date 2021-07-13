const mapDiv = document.querySelector("div#map");
const loader = document.querySelector("div#loader");

const volcanoIcon = L.icon({
    iconUrl: "assets\\img\\volcano3.png",
    iconSize: [32, 32],
})

/* PUT YOUR LEAFLET ACCESS TOKEN here */
const access_token = "pk.eyJ1IjoiY2hlZXNld29sdCIsImEiOiJja3ExMHJ2bmcwYTg3MndxaWoxeTM5NWw0In0.-HhpH5oHKQLucGCfaTn8Rw"; 

let map = null;

let markerCluster = new L.MarkerClusterGroup({
    iconCreateFunction: function(cluster) {
        return L.divIcon({ 
            html: cluster.getChildCount(), 
            className: 'mycluster', 
            iconSize: null 
        });
    }
});

const initMap = () => {
    map = L.map(mapDiv).setView([0, 0], 2);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${access_token}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: access_token
    }).addTo(map);
}

const getVolcanos = () => {
    fetch("http://volcanoapi.ddns.net:3000/volcanos")
        .then(resp => resp.json())
        .then(json => {
            addVolcanosMarker(json)
        })
}

const addVolcanosMarker = (volcanos) => {
    console.log(volcanos)
    volcanos.forEach(volcano => {
        if (volcano.Location) {
            L.geoJSON(null, {
                pointToLayer: (_, latlong) => {
                    const m = L.marker(latlong, { icon: volcanoIcon, title: volcano["Volcano Name"] })
                    .bindPopup(`
                        <div>
                            <h2>${volcano['Volcano Name']}</h2>
                            <ul>
                                <li>Altitude: ${volcano.Elevation}</li>
                                <li>type: ${volcano.Type}</li>
                                <li>status: ${volcano.Status}</li>
                                <li>Dernière eruption: ${volcano["Last Known Eruption"]}</li>
                            </ul>
                        </div>
                    `);
                    markerCluster.addLayer(m);
                }
            })
                .addData(volcano.Location)
                

        }
    })
    mapDiv.classList.remove("hidden");
    loader.classList.add("hidden");
    map.addLayer(markerCluster);
    map.setMaxBounds([[-90, -180], [90, 180]])
    map.invalidateSize();

}


window.addEventListener("load", () => {
    getVolcanos();
    initMap();
})
