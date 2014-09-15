<?php
include './layers.php';
include './access.php';

//if (isset($_REQUEST['test'])){
//    include './services/dao.php';
//    $user = new User();
//    $user->username = "developer";
//}

?>
<html>
<head>
    <meta charset="UTF-8">
    <title>Urban System</title>
    <link rel="stylesheet" href="resources/scripts/leaflet/leaflet.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/locate/L.Control.Locate.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/loading/Control.Loading.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/geocoder/Control.Geocoder.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/routing/leaflet-routing-machine.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/layers/leaflet-categorized-layers.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/sidebar/L.Control.Sidebar.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/toolbar/L.Control.Toolbar.css"/>
    <link rel="stylesheet" href="resources/scripts/leaflet/table/L.Control.Table.css"/>
    <link rel="stylesheet" href="resources/scripts/jquery/ui.jqgrid.css"/>
    <link rel="stylesheet" href="resources/scripts/jquery/jquery-ui.css">
    <link rel="stylesheet" href="resources/scripts/jquery/jquery.splitter.css"/>
    <link rel="stylesheet" href="resources/styles/application.css"/>

    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
</head>

<body>
<div id="page">
    <div id="map"></div>

    <form id="search" method="post" action="">
        <input type="search" id="search_id" placeholder="Căutare">
    </form>

    <div id="toolbar">
        <a class="button" data-target-id="details-layers">
            <span id="layers"></span>
        </a>
        <a class="button" data-target-id="details-transport">
            <span id="info"></span>
        </a>
        <a class="button" data-target-id="details-user">
            <span id="user"></span>
        </a>
    </div>

    <div id="details">
        <div id="details-layers" class="menu-content" style="display: none">
            <h1>Straturi</h1>
            <div id="layers-content">

            </div>
        </div>

        <div id="details-transport" class="menu-content" style="display: none">
            <h1>Transport</h1>
            <div id="info-content"></div>
        </div>

        <div id="details-user"  class="menu-content" style="display: none">
            <h1>Utilizator</h1>
            <div id="user-content">
                <?php if ($user == null) { ?>
                    <form name="frmlogin" id="frmlogin" method="post" action="login.php">
                        <p><input id="username" name="username" type="text" placeholder="Utilizator"></p>

                        <p><input id="pwd" name="pwd" type="password" placeholder="Parola"></p>
                        <input type="submit" class="btnLogIn" value="Logare">
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

                    <?php echo "Buna " . $user->username . " !!!"; ?>
                    <form method="post" action="logout.php">
                        <input type="submit" class="btnSignUp" id="btnLogOut" value="Delogare">
                    </form>

                <?php } ?>
            </div>
        </div>
    </div>

    <div id="about">
        <h1>Despre</h1>

        <p>
            Informatii despre aplicatie ...
        </p>

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
<script src="resources/scripts/leaflet/loading/Control.Loading.js"></script>
<script src="resources/scripts/leaflet/sidebar/L.Control.Sidebar.js"></script>
<script src="resources/scripts/leaflet/easy-button.js"></script>
<script src="resources/scripts/leaflet/toolbar/L.Control.Toolbar.js"></script>
<script src="resources/scripts/leaflet/table/L.Control.Table.js"></script>

<script src="resources/scripts/jquery/jquery-2.1.1.js"></script>
<script src="resources/scripts/jquery/jquery-ui.js"></script>
<script src="resources/scripts/jquery/grid.locale-en.js"></script>
<script src="resources/scripts/jquery/jquery.jqGrid.src.js"></script>
<script src="resources/scripts/jquery/jquery.splitter-0.14.0.js"></script>

<script src="resources/scripts/mustache/mustache.js"></script>

<script src="resources/scripts/utils.js"></script>
<script src="resources/scripts/config.js"></script>
<?if($user != null){?>
    <style scoped="scoped">
        @import url('resources/scripts/leaflet/draw/leaflet.draw.css');
        @import url('resources/styles/editing.css');
    </style>
    <script src="resources/scripts/leaflet/draw/leaflet.draw.js"></script>
    <script src="resources/scripts/editing.js"></script>
<?}?>
<script src="resources/scripts/main.js"></script>

</body>
</html>
