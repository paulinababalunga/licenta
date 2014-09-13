/**
 * App config
 */

var global = {
    defaultBaseLayer : L.tileLayer.provider('OpenStreetMap.Mapnik'),
    featurePopupTemplate : "<b>{{nume}}</b><br/></br>{{descriere}}",
    overlayItemTemplate : "<img src='{{imageUrl}}' width='15px' /> <span class=''>{{title}}</span>"
};

var config = {

    baseLayers:{
        "Hartă de bază":{
            "OSM - Standard": global.defaultBaseLayer,
            "OSM - Black & White": L.tileLayer.provider('OpenStreetMap.BlackAndWhite'),
            "Acetate": L.tileLayer.provider('Acetate'),
            "Esri - WorldStreetMap": L.tileLayer.provider('Esri.WorldStreetMap'),
            "Esri - DeLorme": L.tileLayer.provider('Esri.DeLorme'),
            "Nokia - normal day": L.tileLayer.provider('Nokia.normalDay'),
            "Nokia - satelliteNoLabelsDay": L.tileLayer.provider('Nokia.satelliteNoLabelsDay')
        }
    },

    overlayLayers: {
        "Obiective": L.LayerBuilder.buildLayerGroup(global.overlayItemTemplate, {
            "hotel": {
                title: "Hoteluri",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: "licenta:hotel",
                icon: {
                    url: "resources/image/hotel.png",
                    size: [32, 37]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            },

            "restaurant": {
                title: "Restaurante",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: "licenta:restaurant",
                icon: {
                    url: "resources/image/RestaurantBlue2.png",
                    size: [32, 37]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            },

            "muzeu": {
                title: "Muzee",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: "licenta:muzeu",
                icon: {
                    url: "resources/image/muzeu.png",
                    size: [32, 32]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            },

            "pensiune": {
                title: "Pensiuni",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: "licenta:pensiune",
                icon: {
                    url: "resources/image/pensiune.png",
                    size: [32, 37]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            },

            "spital": {
                title: "Spitale",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: 'licenta:spital',
                icon: {
                    url: "resources/image/hospital.png",
                    size: [20, 20]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            },

            "parc": {
                title: "Parcuri",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: 'licenta:parc',
                icon: {
                    url: "resources/image/tree.png",
                    size: [22, 24]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            },

            "teatru": {
                title: "Teatre",
                workspace: "http://localhost:8080/geoserver/licenta",
                type: "wfs",
                name: 'licenta:teatru',
                icon: {
                    url: "resources/image/theater.png",
                    size: [32, 37]
                },
                popup: {
                    template: global.featurePopupTemplate
                }
            }
        }),

        "Vremea": {
            "OpenWeatherMap Clouds": L.tileLayer.provider('OpenWeatherMap.Clouds'),
            "OpenWeatherMap Precipitation": L.tileLayer.provider('OpenWeatherMap.Precipitation'),
            "OpenWeatherMap Rain": L.tileLayer.provider('OpenWeatherMap.Rain'),
            "OpenWeatherMap Pressure": L.tileLayer.provider('OpenWeatherMap.Pressure'),
            "OpenWeatherMap Wind": L.tileLayer.provider('OpenWeatherMap.Wind'),
            "OpenWeatherMap Temperature": L.tileLayer.provider('OpenWeatherMap.Temperature')
        }
    }
};