L.Control.Toolbar = L.Control.extend({
    options: {
        position: 'topright'
    },

    initialize: function (options) {
        L.setOptions(this, options);
    },

    onAdd : function(map) {
        this._div = L.DomUtil.create('div', 'leaflet-control-toolbar');
        var self = this;

        var sidebar = L.control.sidebar('details', {
            position: 'right'
        }).addTo(map);

        //selected tool
        var selected = null;
        sidebar.on('hidden', function () {
            selected.toggleClass("selected");
            map.fire("tool:" + sidebar.current + ":deactivated");
            selected = null;
            sidebar.current = null;
        });

        $(".button").click(function(){
            var contentId = $(this).data("target-id");
            var currentId = sidebar.current;

            if( contentId == currentId){
                sidebar.hide();
                return;
            }

            //show
            if( selected){
                map.fire("tool:" + currentId  + ":deactivated");
                selected.removeClass("selected");
            }

            selected = $(this);
            selected.addClass("selected");

            $(".menu-content").hide();
            $("#" + contentId).show();

            map.fire("tool:" + contentId + ":activated");

            sidebar.current = contentId;

            if( !sidebar.isVisible()){
                sidebar.show();
            }
        });

        $("#toolbar").appendTo(this._div);

        //this._div.innerHTML = img_log;
        return this._div;
    }
});