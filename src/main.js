// importing the sass stylesheet for bundling
import "./../sass/styles.scss";

// leaflet imports
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// importing from Toolkit module
import { getJSONData } from "./Toolkit";

// defined the web app's data source
const SOURCE = "https://data.novascotia.ca/resource/wwaq-2akq.json";

// leaflet map object
let map;

// --------------------------------------------------------- event handler
function onResponse(jsonData) {
    console.log(jsonData);

    for (let place of jsonData) {
        let {lat, long, english_placename, inm_aite_s_a_gh_idhlig:gaelic} = place;

        // add marker to maps for this place
        let marker = L.marker([lat, long]).addTo (map);
        marker.bindTooltip(`<div class="g-tooltip"><b>${gaelic}</b><br>${english_placename}</div>`);

    }
    
}

// --------------------------------------------------------- main method
function main() {
    // initalize the leaftlet map
    map = L.map("map").setView([45.663966, -61.539917], 8);
    // setup the tile provider for our map object
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 12,
        attribution: "<div>&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a></div>"
    }).addTo(map);

    // ajax request for JSON data
    getJSONData(SOURCE, onResponse, (error) => console.log(`*** an error has occured ${error.message}`));
}

main();