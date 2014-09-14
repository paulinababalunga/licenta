L.Control.Table = L.Control.extend({
    options: {
        position: 'bottomleft'
    },

    initialize: function (options) {
        L.setOptions(this, options);
    },

    map: null,

    selected: null,


    onAdd : function(map) {
        this._div = L.DomUtil.create('div', 'leaflet-control-table collapsed');
        this._div.innerHTML =
            "<div class='table-container'>\
               <div class='bottom-toggler up'></div>\
               <div class='tab-container' id='tabs'>\
                    <ul class='.ui-tabs-nav'>\
                    </ul>\
               </div>\
            </div>";

        var self = this;
        self.map = map;

        //eveniment la selectia unui strat din layers
        map.on("overlayadd", function(e){
            self.onLayerAdd(e);
        });

        //eveniment la ascunderea unui strat
        map.on("overlayremove", function(e){
            self.onLayerRemove(e);
        });

        setTimeout(function(){

//        $(".table-container").resizable({
//            handles: "n, e"
//        });

            $(".bottom-toggler").click(function () {
                $(this).toggleClass("up");
                $(this).toggleClass("down");
                $(".leaflet-control-table").toggleClass("collapsed");
            });

            var tabs = $("#tabs").tabs({
                heightStyle: "auto"
            });

            tabs.delegate("span.ui-icon-close", "click", function () {
                var panelId = $(this).closest("li").remove().attr("aria-controls");
                $("#" + panelId).remove();
                tabs.tabs("refresh");
            });

            self.tabs = tabs;
        }, 200);

        return this._div;
    },

    onLayerAdd: function(event){
        //workspace
        var featureNS = event.layer.options.featureNS;

        //tablename
        var featureType = event.layer.options.featureType;

        var layerId = featureNS + "_" + featureType;

        this.addTabAndTable(layerId, featureType, event.layer._name);
    },

    tabCounter : 0,
    tabTemplate : "<li id='tab-header-#{layerId}'><a href='#{href}'>#{label}</a> </li>",

    addTabAndTable: function(layerId, table, title) {
        var self = this;
        var label = title,
            id = "tab-container-" + layerId,
            li = $(self.tabTemplate.replace(/#\{layerId\}/g, layerId).replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
            tabContentHtml = "Tab " + self.tabCounter + " content.";
        self.tabCounter++;

        var tabs = self.tabs;
        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><table id='table" + layerId + "' style='width:500px'></table></div>");
        tabs.tabs("refresh");

        $("#table" + layerId).jqGrid({
            url: 'services/list-items.php?table=informatii_publice.' + table,
            datatype: "json",
            colNames: ['ID', 'Nume', 'Autor'],
            colModel: [
                {name: 'id', index: 'id', width: 55},
                {name: 'nume', index: 'nume', width: 200},
                {name: 'owner', index: 'name asc, invdate', width: 100}
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            //pager: '#pager2',
            sortname: 'id',
            viewrecords: true,
            sortorder: "desc",
            height: '220',
            width: '900'
        });
    },

    onLayerRemove: function(event){
        //workspace
        var featureNS = event.layer.options.featureNS;

        //tablename
        var featureType = event.layer.options.featureType;

        var layerId = featureNS + "_" + featureType;

        this.removeTab(layerId);
    },

    removeTab: function(layerId) {
        var self = this;

        var tabs = self.tabs;
        //var panelId=tabs.find( 'li').attr( "aria-controls");
        $("#tab-header-" + layerId).remove();
        $("#tab-container-" + layerId).remove();
        tabs.tabs("refresh");
    }
});