var map; // the map object
var layers = {};
var drawControl;

function initMap() {
    // create a map in the "map" div, set the view to a given place and zoom
    map = L.map('map').setView([0, 0], 2);

    // Set the map background to our WMS layer of the world boundaries
    // Replace this with your own background layer


    L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

//    layers.world = L.tileLayer.wms("/geoserver/wfsttest/wms", {
//        layers: 'wfsttest:world',
//        format: 'image/png',
//        transparent: true,
//        attribution: "CDC",
//        noWrap: true
//    }).addTo(map);

    // Initialize the WFST layer 
    layers.drawnItems = L.wfst(null, {
        // Required
        url: 'http://localhost:8080/geoserver/licenta/wfs',
        featureNS: 'parc',
        featureType: 'parc',
        primaryKeyField: 'id'
    }).addTo(map);

    layers.drawnItems.on("click", function (feature) {
        var marker = this;
        marker.bindPopup(feature.properties).openPopup();
        console.log(this);
    });

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: layers.drawnItems
        }
    });

    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        layers.drawnItems.addLayer(e.layer);
    });
    map.on('draw:edited', function (e) {
        layers.drawnItems.wfstSave(e.layers);
    });
}
