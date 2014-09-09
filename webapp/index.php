<?php
include './layers.php';
include './access.php';
?>
<html>
    <head>
        <title>Urban System</title>
        <link rel="stylesheet" href="resources/styles/leaflet.css" />
        <link rel="stylesheet" href="resources/styles/application.css" />
        <link rel="stylesheet" type="text/css" media="screen" href="resources/styles/ui.jqgrid.css" />
        <link rel="stylesheet" href="resources/styles/jquery-ui.css">
        <link rel="stylesheet" href="//rawgithub.com/domoritz/leaflet-locatecontrol/gh-pages/src/L.Control.Locate.css" />
        <link rel="stylesheet" href="resources/styles/leaflet-routing-machine.css" />
        <link rel="stylesheet" href="resources/styles/Control.Geocoder.css" />
        <link rel="stylesheet" href="resources/styles/jquery.splitter.css" />
    </head>
    
    <body>

        <form id="search" method="post" action="">
            <input type="search" id = "search_id" placeholder="Search" >
        </form>

        <div id="header">

            <ul class="meniu" >
                <li id="user" class="menu-item" data-content-id="user-content" >&nbsp;</li>
                <li id="info" class="menu-item" data-content-id="info-content" >&nbsp;</li>
                <li id="layers" class="menu-item" data-content-id="layers-content">&nbsp;</li>	
            </ul>	
        </div>

        <div id="content_meniu">

            <div id="layers-content" class="menu-content" style="display: none">
                <?php foreach ($layers as $index => $layer) { ?>
                    <div>
                        <input type="checkbox" class="layer"
                               id="<?= $layer->id ?>" 
                               data-layer-id="<?= $layer->id ?>" 
                               data-table="<?= $layer->table ?>"
                               data-title="<?= $layer->title ?>"
                               ><label for="<?= $layer->id ?>"><?= $layer->title ?></label>
                        <img src = "<?= $layer->image_url ?>">
                    </div>  
                <?php } ?>
            </div>

            <div id="user-content" class="menu-content" style="display: none">
                <?php if($user == null){ ?>
                    <form name = "frmlogin" id="frmlogin" method="post" action="login.php" >
                        <p><input id="username" name="username" type="text" placeholder="Name"></p>
                        <p><input id="pwd" name="pwd" type="password" placeholder="Password"></p>
                        <input type ="submit"  class="btnLogIn" onclick="" value = "Logare">
                        <input type ="button" class = "btnSignUp" id="signupform" onclick= "SignClick();" value = "Inregistrare">
                    </form>


                    <form name = "frmsignup" id="frmsignup" method="post" style =" display: none" action="sign-up.php">
                        <p><input id="username" name="username" type="text" placeholder="Name"></p>
                        <p><input id="pwd" name="pwd1" type="password" placeholder="Password"></p>
                        <p><input id="pwd" name="pwd2" type="password" placeholder="Confirm Password"></p>
                        <p><input id="email" name="email" type="text" placeholder="Email"></p>
                        <input type ="submit" class = "btnSignUp" id = "btnSignUp" onclick= "" value = "Inregistrare">
                        <input type ="button" class="btnLogIn" id ="btnCancel" onclick= "Cancel();" value = "Renuntare">
                    </form>
                
                <?php }else{ ?>

                    <?php echo "Buna " .$user["username"]." !!!"; ?>
                    <form method="post" action="logout.php">
                        <input type ="submit" class = "btnSignUp" id = "btnLogOut" value = "Logout">
                    </form>

                <?php } ?>


            </div>

            <div id="info-content" class="menu-content" style="display: none">
                

            </div>
            
            <div id="edit" style =" display: none" >
                <input type ="button" class = "btnSignUp" id="btnEdit"  onclick= "" value ="Editeaza">
            </div>
        </div>

        <div id="page">
        <div id="map">
        </div>

        

        <div id="bottom">
            <div id="bottom-toggler">
                <img src ="resources/image/arrow_up_double.png" id = "image">

            </div>
            <div id="tabs" style="height: 100%; width: 100%; display: none;">
                <ul class=".ui-tabs-nav">
                    
                </ul>
            </div>
        </div>
        </div>
        
        
        <script src="resources/scripts/lib/leaflet-src.js"></script>
        <script src="resources/scripts/lib/leaflet-providers.js"></script>
        <script src="resources/scripts/lib/jquery-2.1.1.min.js"></script>
        <script src="resources/scripts/lib/jquery-ui.js"></script>
        <script src="resources/scripts/main.js"></script>
        <script src="resources/scripts/lib/L.Control.Locate.js" ></script>
        <script src="resources/scripts/lib/grid.locale-en.js" type="text/javascript"></script>
        <script src="resources/scripts/lib/jquery.jqGrid.src.js" type="text/javascript"></script>
        <script src="resources/scripts/lib/leaflet-routing-machine.min.js"></script>
        <script src="resources/scripts/lib/Control.Geocoder.js"></script>
        <script src="resources/scripts/lib/jquery.splitter-0.14.0.js"></script>
        
    </body>
</html>

<script>
    var tabCounter = 0,
        tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
                
    function addTabAndTable(layerId, table, title){
        var label = title,
          id = "tabs-" + tabCounter,
          li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
          tabContentHtml = "Tab " + tabCounter + " content.";

        
        tabCounter++;
            
        var tabs = app.tabs;
        tabs.find( ".ui-tabs-nav" ).append( li );
        tabs.append( "<div id='" + id + "'><table id='table" + layerId + "' style='width:500px'></table></div>" );
        tabs.tabs( "refresh" );
        
        $("#table"+layerId).jqGrid({
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
                width:'100%'
            });
    }
    
    
    function removeTab(layerId){
        alert("todo");
        
    }
</script>
