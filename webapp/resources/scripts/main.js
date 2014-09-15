/**
 *
 * Application
 */
var app;
app = {
    /**
     * Map object
     */
    map: null,

    /**
     * Visible layers
     */
    layers:[],

    initMap: function () {
        var self = this;

        var map = self.map = L.map('map', {
            center: [47.15984, 27.57843],
            zoom: 13,
            zoomControl: true,
            layers:[global.defaultBaseLayer]
        });

        var lc = L.control.locate({
            folow:true
        }).addTo(map);

//        map.on('startfollowing', function() {
//            map.on('dragstart', lc.stopFollowing);
//        }).on('stopfollowing', function() {
//            map.off('dragstart', lc.stopFollowing);
//        });


        var r = L.Routing.control({
            geocoder: L.Control.Geocoder.nominatim()
        }).addTo(map);
        $(".leaflet-routing-container").appendTo("#info-content");


        new L.Control.Toolbar({
            map: map
        }).addTo(map);


        new L.Control.CategorizedLayers(config.baseLayers, config.overlayLayers, {
            collapsed: false
        }).addTo(map);
        $(".leaflet-control-layers-expanded").appendTo("#layers-content");

        //eveniment la afisarea unui strat
        map.on("overlayadd", function(e){
            self.layers.push(e.layer);
        });

        //eveniment la ascunderea unui strat
        map.on("overlayremove", function(e){
            var index = self.layers.indexOf(e.layer);
            if( index > -1){
                self.layers.splice(index, 1);
            }
        });



        var aboutSidebar = L.control.sidebar('about', {
            position: 'left'
        });
        map.addControl(aboutSidebar);


        L.easyButton('about-icon fa-info', function(){
                aboutSidebar.toggle();
            }, 'Despre',map);


        //last control
        L.Control.loading({
            separate: true
        }).addTo(map);


        new L.Control.Table().addTo(map);

        console.log("Map initialized");
    },


    initLayout: function () {
        var self = this;

        /* search function*/

        $("#search_id").autocomplete({
            source: function (request, response) {
                $.ajax("services/search.php", {
                    dataType: "json",
                    data: {
                        term: request.term
                    },
                    success: function (data) {
                        var r = [];
                        for (var i = 0; i < data.length; i++) {
                            var item = data[i];
                            r.push({
                                id: item.id,
                                label: item.nume,
                                value: item.nume,
                                descriere: item.descriere,
                                x: item.x,
                                y: item.y
                            });
                        }

                        response(r);

                    },
                    error: function (err) {
                        console.error("Eroare la cautare", err);
                    }
                });

            },
            select: function (event, ui) {
                var x = ui.item.x, y = ui.item.y, title = ui.item.label;
                app.map.panTo(L.latLng(y, x));


                L.marker([y, x], {
                    title: "title"
                }).addTo(app.map)
                    .bindPopup(title)
                    .openPopup();

                ;

            }

        });



        //function reset map and routing

        $("#btnReset").click(function () {
            $(".leaflet-routing-geocoders").children().val("");
            if ($(".leaflet-routing-alt")) {
                $(".leaflet-routing-alt").remove();
            }
            app.reset();
        });
    },

    reset: function () {

        this.map.remove();
        $(".leaflet-routing-container").remove();
        this.initMap();
    },


    run: function () {
        this.initLayout();
        this.initMap();
    }
};


function SignClick() {
    $("#frmlogin").hide(),
        $("#frmsignup").show("slow");

}

function Cancel() {
    $("#frmsignup")[0].reset();
    $("#frmsignup").hide(),
        $("#frmlogin").show("slow");

}


$(function () {
    app.run();
});





