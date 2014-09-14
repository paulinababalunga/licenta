/**
 * Activeaza si initializeaza functionalitatile de editare.
 */
(function(){

    /**
     * Editing features control
     */
    var Editing = L.extend({}, {

        map: null,

        /**
         * Componenta de desenare si editare elemente
         */
        drawControl: null,

        /**
         * Grupul de elemente ce sunt adaugate pe harta si se pot edita.
         */
        featureGroup:null,

        /**
         * Draw handler curent pentru adaugare de elemente.
         */
        currentDrawer: null,


        /**
         * Activare functionalitati de editare.
         */
        activate: function(){
            var editToolItem =
                "<a class='button' data-target-id='editing'>\
                    <span id='edit'></span>\
                </a>";

            //TODO: incarcare dinamica de la un href ?
            var editSidebarContent =
                "<div id='editing' class='menu-content'>\
                    <h1>Editare</h1>\
                    <div class='template-picker'>\
                        <div class='item'></div>\
                        <div class='item'></div>\
                    </div>\
                    <div class='attribute-editor'>\
                        <h1>Atribute</h1>\
                        <div class='attribute-form'>\
                            <div>\
                                <label>Nume:</label><input type='text'/>\
                            </div>\
                            <div>\
                                <label>Descriere:</label><textarea></textarea>\
                            </div>\
                        </div>\
                        <div class='attribute-buttons'>\
                            <button>Salveaza</button>\
                            <button>Renunta</button>\
                        </div>\
                    </div>\
                </div>";

            //adaugare buton de editare in toolbar
            $("#toolbar").append($(editToolItem));

            //adaugare panou editare
            $("#details").append($(editSidebarContent));

            console.log("Editing activated");
        },

        initialize: function(map){
            var self = this;
            self.map = map;
            map.on("tool:editing:activated", function(){
                //init draw control on first display
                if(!self.drawControl) {
                    self.initEditControl(self.map);
                }

                self.updateFeatureGroup();
                self.updateTemplatePicker();
                self.showEditControl();
            });

            map.on("tool:editing:deactivated", function(){
                if( self.currentDrawer){
                    self.currentDrawer.disable();
                }
                self.hideEditControl();
            });

            console.log("Editing initialized");
        },

        initEditControl: function(map){
            if(this.drawControl) return;

            var self = this;
            //TODO: initializare straturi de editat cu cele de tip WFS din map.
            var featureGroup = new L.FeatureGroup();
            map.addLayer(featureGroup);

            var drawControl = new L.Control.Draw({
                position:'topleft',
                draw: false,
                edit: {
                    featureGroup: featureGroup
                }
            });

            map.addControl(drawControl);

            self.drawControl = drawControl;
            self.featureGroup = featureGroup;
        },

        updateFeatureGroup: function(){
            var self = this;
            self.featureGroup.clearLayers();
            $.each(app.layers, function(index, layer){
                var features = layer.getLayers();
                $.each(features, function(index, feature){
                    self.featureGroup.addLayer(feature);
                });
            });
        },

        itemTemplate: "<div class='item'  data-config-index='{{index}}'><img src='{{url}}' alt='{{title}}' width='{{width}}' height='{{height}}' /><span>{{title}}</span></div>",

        currentConfigs:[],

        /**
         * Refresh template picker.
         */
        updateTemplatePicker: function(){
            var self = this;
            var tp = $(".template-picker");
            tp.empty();

            var cfgIndex = 0;
            $.each(app.layers, function(index, layer){
                var layerConfig = L.LayerBuilder.layerConfigMapping[layer.options.featureNS+":"+layer.options.featureType];
                if( layerConfig){
                    self.currentConfigs[cfgIndex] = layerConfig;
                    var content = Mustache.render(self.itemTemplate, {
                        index: cfgIndex,
                        url: layerConfig.icon.url,
                        width: layerConfig.icon.size[0],
                        height: layerConfig.icon.size[1],
                        title: layerConfig.title
                    });
                    tp.append($(content));
                    cfgIndex++;
                }
            });

            var selected = null;
            $(".template-picker .item").click(function(event){
                var current = $(this);

                if(selected && current.data("config-index") == selected.data("config-index")){
                    self.deactivateAddFeature();
                    selected.removeClass("selected");
                    selected = null;
                }else{
                    if( selected){
                        self.deactivateAddFeature();
                        selected.removeClass("selected");
                    }
                    var layerConfig = self.currentConfigs[current.data("config-index")];
                    self.activateAddFeature(layerConfig);
                    current.addClass("selected");
                    selected = current;
                }
                event.stopPropagation();
            });
        },

        currentDrawingLayerConfig : null,

        activateAddFeature: function(layerConfig){

            var options = {
                icon: L.icon({
                    iconUrl: layerConfig.icon.url
                    //,shadowUrl: 'leaf-shadow.png'
                    ,iconSize: layerConfig.icon.size // size of the icon
                    //,shadowSize:   [50, 64] // size of the shadow
                    //,iconAnchor:   [10, 70] // point of the icon which will correspond to marker's location
                    //,shadowAnchor: [4, 62]  // the same for the shadow
                    //,popupAnchor:  [-15, -80] // point from which the popup should open relative to the iconAnchor
                })
            };

            this.currentDrawer = new L.Draw.Marker(this.map, options);
            this.currentDrawer.enable();
            this.currentDrawingLayerConfig = layerConfig;
        },

        deactivateAddFeature: function(){
            this.currentDrawer.disable();
            this.currentDrawer = null;
        },

        showEditControl: function(){
            $(".leaflet-draw").show();
        },

        hideEditControl: function(){
            $(".leaflet-draw").hide();
        }

    });

    Editing.activate();

    //TODO: Dupa initializare harta, initializare editing module
    setTimeout(function(){
        Editing.initialize(app.map);
    }, 1000);
})();
