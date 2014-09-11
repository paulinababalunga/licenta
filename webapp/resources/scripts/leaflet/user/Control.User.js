L.Control.User = L.Control.extend({
    options: {
        position: 'topright'
    },

    initialize: function (options) {
        L.setOptions(this, options);
    },

    onAdd : function(map) {
        this._div = L.DomUtil.create('div', 'leaflet-control-user');
        var img_log = "<div class=''></div>";

        this._div.innerHTML = img_log;
        return this._div;
    }
});