/**
 * Layer builder.
 */
L.LayerBuilder = {

    /**
     * Build an object with layer names and layer object
     * @param itemTemplate
     * @param config
     * @returns {{}}
     */
    buildLayerGroup : function(itemTemplate, config){
        var self = this;
        var layers = {};
        $.each(config, function (index, layerConfig) {
            var layer = self.buildLayer(layerConfig);
            console.log("got layer", layer);

            if(layer){
                var txt = Mustache.render(itemTemplate,{
                    imageUrl : layerConfig.icon.url,
                    title: layerConfig.title
                });

                layers[txt] = layer;
            }
        });
        return layers;
    },

    /**
     *
     * @param layerConfig
     * @returns {*}
     */
    buildLayer : function(layerConfig){
        var type = layerConfig.type;
        var layer = null;
        switch (type){
            case "wms":
                layer = this.buildMWSLayer(layerConfig);
                break;

            case "wfs":
                layer = this.buildWFSLayer(layerConfig);
                break;

            default :
                console.error("Tip layer necunoscut :" + type);
        }

        return layer;
    },

    /**
     *
     * @param layerConfig
     * @returns {*}
     */
    buildMWSLayer : function(layerConfig){
        var url = layerConfig.workspace + "/" + layerConfig.type;
        var layer = L.tileLayer.wms(url, {
            layers: layerConfig.name,
            format: layerConfig.format,
            transparent: true,
            opacity: 1
        });

        return layer;
    },

    /**
     *
     * @param layerConfig
     * @returns {*}
     */
    buildWFSLayer : function(layerConfig){
        var url = layerConfig.workspace + "/" + layerConfig.type;
        var featureNamespace = layerConfig.name.split(':')[0];
        var featureType = layerConfig.name.split(':')[1];

        var layer = L.wfst(null, {
            // Required
            version: "1.0.0",
            url: url,
            featureNS: featureNamespace,
            featureType: featureType,
            primaryKeyField: 'id',

            pointToLayer: function(feature, latlng){
                return L.marker(latlng, {icon: L.icon({
                    iconUrl: layerConfig.icon.url
                    //,shadowUrl: 'leaf-shadow.png'
                    ,iconSize: layerConfig.icon.size // size of the icon
                    //,shadowSize:   [50, 64] // size of the shadow
                    //,iconAnchor:   [10, 70] // point of the icon which will correspond to marker's location
                    //,shadowAnchor: [4, 62]  // the same for the shadow
                    //,popupAnchor:  [-15, -80] // point from which the popup should open relative to the iconAnchor
                })});
            },

            onEachFeature: function (feature, layer) {
                var template = layerConfig.popup.template;
                var output = Mustache.render(template, feature.properties);
                layer.bindPopup(output);

    //                layer.on({
    //                    //"mouseover",
    //                    //"mouseout"
    //                    "click": function(e){
    //                        app.map.fitBounds(e.target.getBounds());
    //                    }
    //                });
            }
        });

        return layer;
    }
};