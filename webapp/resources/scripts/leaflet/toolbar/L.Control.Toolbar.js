L.Control.Toolbar = L.Control.extend({
    options: {
        position: 'topright'
    },

    initialize: function (options) {
        L.setOptions(this, options);
    },

    selected: null,

    onAdd : function(map) {
        this._div = L.DomUtil.create('div', 'leaflet-control-toolbar');
        var self = this;

        self.sidebar = L.control.sidebar('details', {
            position: 'right'
        }).addTo(map);

        self.sidebar.on('hidden', function () {
            self.selected.toggleClass("selected");
            self.selected = null;
            self.sidebar.current = null;
        });

        $(".button").click(function(){
            var contentId = $(this).data("target-id");
            var currentId = self.sidebar.current;

            if( contentId == currentId){
                self.sidebar.hide();
                return;
            }

            //show
            if( self.selected){
                self.selected.removeClass("selected");
            }

            self.selected = $(this);
            self.selected.addClass("selected");

            $(".menu-content").hide();
            $("#" + contentId).show();

            self.sidebar.current = contentId;

            if( !self.sidebar.isVisible()){
                self.sidebar.show();
            }
        });

        $("#toolbar").appendTo(this._div);

        //this._div.innerHTML = img_log;
        return this._div;
    }
});