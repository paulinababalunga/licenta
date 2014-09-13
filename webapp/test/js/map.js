var map; // the map object
var layers = {};
var drawControl;

var editingFeature = null;

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
        version: "1.0.0",
        url: 'http://localhost:8080/geoserver/licenta/wfs',
        featureNS: 'hotel',
        featureType: 'hotel',
        primaryKeyField: 'id'
    }).addTo(map);

//    layers.drawnItems.on("click", function (feature, layer) {
//        console.log( layer);
//        var marker = this;
//        marker.bindPopup(feature.properties).openPopup();
//        console.log(this);
//    });

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        draw:{
            polyline:false,
            polygon:false,
            rectangle:false,
            circle:false
        },
        edit: {
            featureGroup: layers.drawnItems
        }
    });

    map.addControl(drawControl);


    var sidebar = L.control.sidebar('sidebar', {
        position: 'right'
    });
    map.addControl(sidebar);


    map.on('draw:created', function (e) {
        editingFeature = e.layer;

        layers.drawnItems.addLayer(e.layer);
        sidebar.show();
    });

    map.on('draw:edited', function (e) {
        layers.drawnItems.wfstSave(e.layers);
    });

    map.on('draw:deleted', function(e){
        var features = e.layers;
        features.eachLayer(function (layer) {

            console.log("removing", layer);
            layers.drawnItems.wfstRemove(layer);
        });
//        layers.drawnItems.removeLayer(features);
    });

    sidebar.on('shown', function () {
        //sidebar.setContent('test <b>test</b> test');




    });

    sidebar.on('hidden', function () {

    });
}
