<?php
include './layers.php';
include './access.php';
?>
<html>
<head>
    <title>Urban System</title>
    <link rel="stylesheet" href="resources/scripts/leaflet/leaflet.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/locate/L.Control.Locate.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/loading/Control.Loading.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/geocoder/Control.Geocoder.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/routing/leaflet-routing-machine.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/user/Contro.User.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/layers/leaflet-categorized-layers.css"/>
    <link rel="stylesheet" href="resources/scripts/jquery/ui.jqgrid.css"/>
    <link rel="stylesheet" href="resources/scripts/jquery/jquery-ui.css">
    <link rel="stylesheet" href="resources/scripts/jquery/jquery.splitter.css"/>
    <link rel="stylesheet" href="resources/styles/application.css"/>
</head>

<body>

<form id="search" method="post" action="">
    <input type="search" id="search_id" placeholder="Cautare">
</form>

<div id="header">
    <ul class="meniu">
        <li id="user" class="menu-item" data-content-id="user-content">&nbsp;</li>
        <li id="info" class="menu-item" data-content-id="info-content">&nbsp;</li>
        <li id="layers" class="menu-item" data-content-id="layers-content">&nbsp;</li>
    </ul>
</div>

<div id="content_meniu">

    <div id="layers-content" class="menu-content" style="display: none">

    </div>

    <div id="user-content" class="menu-content" style="display: none">
        <?php if ($user == null) { ?>
            <form name="frmlogin" id="frmlogin" method="post" action="login.php">
                <p><input id="username" name="username" type="text" placeholder="Nume"></p>

                <p><input id="pwd" name="pwd" type="password" placeholder="Parola"></p>
                <input type="submit" class="btnLogIn" onclick="" value="Logare">
                <input type="button" class="btnSignUp" id="signupform" onclick="SignClick();" value="Inregistrare">
            </form>


            <form name="frmsignup" id="frmsignup" method="post" style=" display: none" action="sign-up.php">
                <p><input id="username" name="username" type="text" placeholder="Nume"></p>

                <p><input id="pwd" name="pwd1" type="password" placeholder="Parola"></p>

                <p><input id="pwd" name="pwd2" type="password" placeholder="Confirma Parola"></p>

                <p><input id="email" name="email" type="text" placeholder="Email"></p>
                <input type="submit" class="btnSignUp" id="btnSignUp" onclick="" value="Inregistrare">
                <input type="button" class="btnLogIn" id="btnCancel" onclick="Cancel();" value="Renuntare">
            </form>

        <?php } else { ?>

            <?php echo "Buna " . $user["username"] . " !!!"; ?>
            <form method="post" action="logout.php">
                <input type="submit" class="btnSignUp" id="btnLogOut" value="Delogare">
            </form>

        <?php } ?>


    </div>

    <div id="info-content" class="menu-content" style="display: none">
        <p>Selecteaza traseul:</p>
        <form id="reset">
            <input type="button" id="btnReset" value="Reseteaza">
        </form>


    </div>

    <div id="edit" style=" display: none">
        <input type="button" class="btnSignUp" id="btnEdit" onclick="" value="Editeaza">
    </div>
</div>

<div id="page">
    <div id="map">
    </div>


    <div id="bottom">
        <div id="bottom-toggler">
            <img src="resources/image/arrow_up_double.png" id="image">

        </div>
        <div id="tabs" style="height: 100%; width: 100%; display: none;">
            <ul class=".ui-tabs-nav">

            </ul>
        </div>
    </div>
</div>


<script src="resources/scripts/leaflet/leaflet.js"></script>
<script src="resources/scripts/leaflet/leaflet-providers.js"></script>
<script src="resources/scripts/leaflet/routing/leaflet-routing-machine.js"></script>
<script src="resources/scripts/leaflet/geocoder/Control.Geocoder.js"></script>
<script src="resources/scripts/leaflet/locate/L.Control.Locate.js"></script>
<script src="resources/scripts/leaflet/leaflet.gml.js"></script>
<script src="resources/scripts/leaflet/leaflet.wfst.js"></script>
<script src="resources/scripts/leaflet/layers/leaflet-categorized-layers.js"></script>
<script src="resources/scripts/utils.js"></script>
<script src="resources/scripts/leaflet/loading/Control.Loading.js"></script>
<script src="resources/scripts/leaflet/user/Control.User.js"></script>

<script src="resources/scripts/jquery/jquery-2.1.1.js"></script>
<script src="resources/scripts/jquery/jquery-ui.js"></script>
<script src="resources/scripts/jquery/grid.locale-en.js"></script>
<script src="resources/scripts/jquery/jquery.jqGrid.src.js"></script>
<script src="resources/scripts/jquery/jquery.splitter-0.14.0.js"></script>

<script src="resources/scripts/mustache/mustache.js"></script>

<script src="resources/scripts/config.js"></script>
<script src="resources/scripts/main.js"></script>

</body>
</html>

<script>
    var tabCounter = 0,
        tabTemplate = "<li id='tab-header-#{layerId}'><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";

    function addTabAndTable(layerId, table, title) {
        var label = title,
            id = "tab-container-" + layerId,
            li = $(tabTemplate.replace(/#\{layerId\}/g, layerId).replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label)),
            tabContentHtml = "Tab " + tabCounter + " content.";


        tabCounter++;

        var tabs = app.tabs;
        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><table id='table" + layerId + "' style='width:500px'></table></div>");
        tabs.tabs("refresh");

        $("#table" + layerId).jqGrid({
            url: 'services/list-items.php?table=' + table,
            datatype: "json",
            colNames: ['ID', 'Nume', 'Autor'],
            colModel: [
                {name: 'id', index: 'id', width: 55},
                {name: 'nume', index: 'nume', width: 400},
                {name: 'owner', index: 'name asc, invdate', width: 200}
            ],
            rowNum: 10,
            rowList: [10, 20, 30],
            //pager: '#pager2',
            sortname: 'id',
            viewrecords: true,
            sortorder: "desc",
            height: '200',
            width: '100%'
        });
    }


    function removeTab(layerId) {
        /*to do*/

        var tabs = app.tabs;
        //var panelId=tabs.find( 'li').attr( "aria-controls");
        $("#tab-header-" + layerId).remove();
        $("#tab-container-" + layerId).remove();
        tabs.tabs("refresh");
    }
</script>
