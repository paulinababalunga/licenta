/**
 * App config
 */
var commonFeatureTemplate = "<b>{{nume}}</b><br/></br>{{descriere}}";

var config = {

    layers: {
        "public": {
            title: "Informatii publice",
            group: true,
            layers: {
                "hotel": {
                    title: "Hoteluri",
                    workspace: "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: "licenta:hotel",
                    icon:{
                        url: "resources/image/hotel.png",
                        size: [32, 37]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                },

                "restaurant": {
                    title: "Restaurante",
                    workspace : "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: "licenta:restaurant",
                    icon:{
                        url: "resources/image/RestaurantBlue2.png",
                        size: [32, 37]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                },

                "muzeu":{
                    title: "Muzee",
                    workspace : "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: "licenta:muzeu",
                    icon:{
                        url: "resources/image/muzeu.png",
                        size: [32, 32]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                },

                "pensiune":{
                    title: "Muzee",
                    workspace : "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: "licenta:pensiune",
                    icon:{
                        url: "resources/image/pensiune.png",
                        size: [32, 37]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                },

                "spital": {
                    title: "Spitale",
                    workspace : "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: 'licenta:spital',
                    icon:{
                        url: "resources/image/hospital.png",
                        size: [20, 20]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                },

                "parc":{
                    title: "Parcuri",
                    workspace : "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: 'licenta:parc',
                    icon:{
                        url: "resources/image/tree.png",
                        size: [22, 24]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                },

                "teatru":{
                    title: "Teatre",
                    workspace : "http://localhost:8080/geoserver/licenta",
                    type: "wfs",
                    name: 'licenta:teatru',
                    icon:{
                        url: "resources/image/theater.png",
                        size: [32, 37]
                    },
                    popup: {
                        template: commonFeatureTemplate
                    }
                }
            }
        }
    }
};