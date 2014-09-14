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
            marker:false,
            polyline:false,
            polygon:false,
            rectangle:false,
            circle:false
        }
        ,
        edit: {
            featureGroup: layers.drawnItems
        }
    });

    map.addControl(drawControl);


    var sidebar = L.control.sidebar('sidebar', {
        position: 'right'
    });
    map.addControl(sidebar);

    sidebar.on('shown', function () {
        //sidebar.setContent('test <b>test</b> test');

    });

    sidebar.on('hidden', function () {

    });

    setTimeout(function(){
        sidebar.show()
    }, 500);


//    map.on('draw:created', function (e) {
//        editingFeature = e.layer;
//
//        layers.drawnItems.addLayer(e.layer);
//        sidebar.show();
//    });

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




//    var editHandler = null;
//    var drawHander = null;
//
//    function activateEditMarker(){
//
//        for(var i in drawControl._toolbars){
//            if(typeof drawControl._toolbars[i]._modes.marker != 'undefined'){
//                drawHander = drawControl._toolbars[i]._modes.marker.handler;
//            }
//
//            if(typeof drawControl._toolbars[i]._modes.edit != 'undefined'){
//                editHandler = drawControl._toolbars[i]._modes.edit.handler;
//            }
//        }
//
//        //editHandler.enable();
//        drawHander.enable();
//    }
//
//
//    setTimeout(function(){
//        activateEditMarker();
//    }, 1000);
//
//    setTimeout(function(){
//        drawHander.disable();
//    }, 10000);

    var hotelOptions = {
        icon: L.icon({
            iconUrl: '../resources/image/hotel.png'
            //,shadowUrl: 'leaf-shadow.png'
            ,iconSize: [32, 37] // size of the icon
            //,shadowSize:   [50, 64] // size of the shadow
            //,iconAnchor:   [10, 70] // point of the icon which will correspond to marker's location
            //,shadowAnchor: [4, 62]  // the same for the shadow
            //,popupAnchor:  [-15, -80] // point from which the popup should open relative to the iconAnchor
        })
    };

    var hotelDrawer = new L.Draw.Marker(map, hotelOptions);

    $("#placeHotelStart").click(function(){
        hotelDrawer.enable();
    });

    $("#placeHotelCancel").click(function(){
        hotelDrawer.disable();
    });

}
