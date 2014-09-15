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
                    <span class='editing-help'>Selectati straturile pentru editare.</span>\
                    <div class='template-picker'>\
                    </div>\
                    <div class='attribute-editor'>\
                        <h1>Atribute</h1>\
                        <div class='attribute-form'>\
                            <div>\
                                <label>Nume:</label><input type='text' id='feature-name'/>\
                            </div>\
                            <div>\
                                <label>Descriere:</label><textarea id='feature-desc'></textarea>\
                            </div>\
                        </div>\
                        <div class='attribute-buttons'>\
                            <button class='save-feature'>Salveaza</button>\
                            <button class='cancel-edit'>Renunta</button>\
                        </div>\
                    </div>\
                    <div class='save-status'></div>\
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

            map.on('draw:created', function (e) {
                var i = 0;
                self.featureGroup.addLayer(self.currentFeature = e.layer);

                self.currentFeature.layerIndex = self.selectedTemplate.data("layer-index");

                self.selectedTemplate.removeClass("selected");
                self.selectedTemplate = null;

                $(".attribute-editor").show();
                $("#feature-name").focus();
            });

            map.on('draw:edited', function (e) {
                e.layers.eachLayer(function (layer) {
                    console.log("removing", layer);

                    var wfsLayer = layer.wfsLayer;
                    if( wfsLayer){
                        wfsLayer.wfstSave(layer);
                    }
                });
            });

            map.on('draw:deleted', function(e){
                self.featureGroup.removeLayer(e.layer);
                e.layers.eachLayer(function (layer) {
                    console.log("removing", layer);

                    var wfsLayer = layer.wfsLayer;
                    if( wfsLayer){
                        wfsLayer.wfstRemove(layer);
                    }
                });
            });

            $('.save-feature').click(function(){
                var name = $('#feature-name').val();
                var desc = $('#feature-desc').val();

                var wfsLayer = app.layers[self.currentFeature.layerIndex];

                self.currentFeature.feature = {
                    properties:{
                        "nume": name,
                        "descriere": desc
                    }
                };

                $(".save-status").removeClass("error").html("In curs de salvare ...");
                wfsLayer.wfstAdd( self.currentFeature, {
                    success: function(){
                        $(".save-status").html("Operatie reusita");

                        $(".attribute-editor").hide();
                    },
                    failure:function(){
                        $(".save-status").addClass("error").html("Operatie esuata");
                    }
                });
            });

            $('.cancel-edit').click(function(){
                if( self.currentFeature) {
                    self.featureGroup.removeLayer(self.currentFeature);
                    $("#feature-name").val("");
                    $("#feature-desc").val("");
                    $(".attribute-editor").hide();
                }
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

        itemTemplate: "<div class='item'  data-config-index='{{configIndex}}' data-layer-index='{{layerIndex}}'><img src='{{url}}' alt='{{title}}' width='{{width}}' height='{{height}}' /><span>{{title}}</span></div>",

        currentConfigs:[],

        selectedTemplate: null,

        currentFeature: null,

        /**
         * Refresh template picker.
         */
        updateTemplatePicker: function(){
            var self = this;
            var tp = $(".template-picker");
            tp.empty();

            self.currentConfigs = [];

            var cfgIndex = 0;
            $.each(app.layers, function(index, layer){
                var layerConfig = L.LayerBuilder.layerConfigMapping[layer.options.featureNS+":"+layer.options.featureType];
                if( layerConfig){
                    self.currentConfigs[cfgIndex] = layerConfig;
                    var content = Mustache.render(self.itemTemplate, {
                        layerIndex: index,
                        configIndex: cfgIndex,
                        url: layerConfig.icon.url,
                        width: layerConfig.icon.size[0],
                        height: layerConfig.icon.size[1],
                        title: layerConfig.title
                    });
                    tp.append($(content));
                    cfgIndex++;
                }
            });

            if( self.currentConfigs.length==0){
                $(".editing-help").show();
            }else{
                $(".editing-help").hide();
            }

            $(".template-picker .item").click(function(event){
                var current = $(this);
                var selected = self.selectedTemplate;
                if(selected && current.data("config-index") == selected.data("config-index")){
                    self.deactivateAddFeature();
                    selected.removeClass("selected");
                    self.selectedTemplate = null;
                }else{
                    if( selected){
                        self.deactivateAddFeature();
                        selected.removeClass("selected");
                    }
                    var layerConfig = self.currentConfigs[current.data("config-index")];
                    self.activateAddFeature(layerConfig);
                    current.addClass("selected");
                    self.selectedTemplate = current;
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
