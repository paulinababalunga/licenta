<?php

class LayerInfo
{
    var $id;
    var $table;
    var $title;
    var $image_url;
}

$parcuri = new LayerInfo();
$parcuri->id = "parc";
$parcuri->table = "informatii_publice.parc";
$parcuri->title = "Parcuri";
$parcuri->image_url = "resources/image/tree.png";

$teatre = new LayerInfo();
$teatre->id = "teatru";
$teatre->table = "informatii_publice.teatru";
$teatre->title = "Teatre";
$teatre->image_url = "resources/image/theater.png";

$hoteluri = new LayerInfo();
$hoteluri->id = "hotel";
$hoteluri->table = "informatii_publice.hotel";
$hoteluri->title = "Hoteluri";
$hoteluri->image_url = "resources/image/hotel.png";

$restaurante = new LayerInfo();
$restaurante->id = "restaurant";
$restaurante->table = "informatii_publice.restaurant";
$restaurante->title = "Restaurante";
$restaurante->image_url = "resources/image/resto.png";

$muzee = new LayerInfo();
$muzee->id = "muzeu";
$muzee->table = "informatii_publice.muzeu";
$muzee->title = "Muzee";
$muzee->image_url = "resources/image/muzeu.png";

$pensiuni = new LayerInfo();
$pensiuni->id = "pensiune";
$pensiuni->table = "informatii_publice.pensiune";
$pensiuni->title = "Pensiuni";
$pensiuni->image_url = "resources/image/pensiune.png";

$spitale = new LayerInfo();
$spitale->id = "spital";
$spitale->table = "informatii_publice.spital";
$spitale->title = "Spitale";
$spitale->image_url = "resources/image/hospital.png";

$layers = [$parcuri, $muzee, $teatre, $restaurante, $hoteluri, $pensiuni, $spitale,];
