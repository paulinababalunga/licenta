<?php
//$http_origin = $_SERVER['HTTP_ORIGIN'];
header("Access-Control-Allow-Origin: http://localhost:8080");
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-7">
    <title>WFS-T Leaflet Plugin</title>

    <!-- Leaflet 0.7.3 CSS/JS from CDN -->
    <link type="text/css" rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css"/>
    <!--[if lte IE 8]>
    <link type="text/css" rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.ie.css"/>
    <![endif]-->
    <script type="text/javascript" src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>

    <script src="js/leaflet-providers.js"></script>


    <!-- Leaflet Draw 0.2.0 (you'll need to download these -->
    <!-- Point these URLs at your own copy of Leaflet.draw, or run:

    git submodule init
    git submodule update

    to initialize the git submodule
    -->
    <link type="text/css" rel="stylesheet" href="js/Leaflet.draw/leaflet.draw.css"/>
    <script type="text/javascript" src="js/Leaflet.draw/leaflet.draw.js"></script>

    <!-- This is what you're here for! -->
    <!-- leaflet.gml.js, leaflet.wfst.js -->
    <script type="text/javascript" src="js/leaflet.gml.js"></script>
    <script type="text/javascript" src="js/leaflet.wfst.js"></script>


    <!-- css and js for demo -->
    <link type="text/css" rel="stylesheet" href="css/map.css"/>
    <script type="text/javascript" src="js/map.js"></script>
</head>
<body>
<div id="map"></div>
<script type="text/javascript">
    // Load the map with the initMap function in map.js
    initMap();
</script>
</body>
</html>
