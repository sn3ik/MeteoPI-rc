<?php

$name_station = "Formia Weather Station";
$city = "Formia";

$server = "localhost";
$user = "no";
$pwd = "no";
$db = "no";
$swpipwd = "no";

$lat = "41.26";   // latitudine  del luogo di osservazione in gradi sessadecimali.
$lon = "13.60";   // longitudine del luogo di osservazione in gradi sessadecimali.
$alt = "10";     // altitudine del luogo di osservazione in gradi sessadecimali.

$img_cam_path = 'img/tl_animate.gif';
$img_no_available = 'img/no_av.jpg';


$range_t = 5;     // range temperatura del grafico.
$range_u = 5;     // range umidità del grafico.
$range_p = 10;    // range pressione del grafico.
$range_n = 100;    // range nuvole del grafico.
$range_v = 5;     // range massimo vento del grafico.

$apiRequest       = "https://api.met.no/weatherapi/locationforecast/1.9/?";
$apiParameters    = "lat=".$lat."&lon=".$lon."&msl=".$alt;
//$apiParametersLevel   .= "&msl=156";
$dieOnError = false;

?>
