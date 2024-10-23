<?php
require("weather.php");
//require("metno/METno.php");
?>

<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $name_station; ?></title>
<link rel="icon" type="image/png" href="icons/icon_ipad_x2.png" />
<script src="custom.js"></script>

<script type="text/javascript" src="astrojs/astrojs.js"></script>
<script src="js/tween-min.js"></script>
<script src="js/steelseries-min.js"></script>

<meta property="og:title" content="Observatory Weather Station"/>
<meta property="og:description" content="Temp: <?php echo $temp_out;?>°C - Hum: <?php echo $umidity;?>% - Press: <?php echo $pressure; ?> hPa - <?php echo $wind_nome ." ". $wind_ave; ?> km/h"  />
<meta property="og:url" content="http://francescocangiani.com/meteo/"/>
<meta property="og:image" content="https://www.meteo60.fr/satellites/animation-satellite-ir-france.gif"/>

<style>

body {
  background-color: #696969;
  color: #F5F5F5 !important;
  font: normal 13px Verdana, Arial, sans-serif;
}
* {
  box-sizing: border-box;
}

.header {
  border-radius:6px;
  background-color:#414141;
  padding:20px;
  text-align:center;
}
.footer {
  border-radius:6px;
  background-color:#414141;
  padding:20px;
  margin-top:7px;
  text-align:center;
}
.menu {
  border-radius:6px;
  background-color:#414141;
  float:left;
  width:25%;
  text-align:center;
}
.menu a {
  border-radius:6px;
  background-color:#414141;
  padding:8px;
  margin-top:7px;
  display:block;
  width:100%;
  color:black;
}
.main {
  border-radius:6px;
  background-color:#414141;
  float:left;
  width:48%;
  padding:20px;
  margin-top:7px;
}
.left {
  border-radius:6px;
  background-color:#414141;
  float:left;
  width:25%;
  padding:15px;
  margin-top:7px;
  margin-right:7px;
  text-align:center;
}
.left a {
  border-radius:6px;
  background-color:#414141;
  padding:8px;
  margin-top:7px;
  display:block;
  width:100%;
  color:black;
}
.right {
  border-radius:6px;
  background-color:#414141;
  float:left;
  width:25%;
  padding:15px;
  margin-top:7px;
  margin-left:7px;

  text-align:center;
}
.right a {
  border-radius:6px;
  background-color:#414141;
  padding:8px;
  margin-top:7px;
  display:block;
  width:100%;
  color:black;
}
.max {
  color: red;
}
.min {
  color: lightblue;
}
.sun {
  color: yellow;
}
.progressBar {
  background-color: lightgrey;
  width: 200px;
  height: 20px;

}
.progress {
    width: 50%;
    height: 100%;
    background-color: @keyframes;
}

@keyframes color{
    10% {
    background-color: #0f0;
    width: 20%;/*At 10%, change the width to 20%*/
    }
    40% {
    background-color: #ff0;
    width: 40%;
    }
    70% {
    background-color: #f00;
    width: 60%;
    }
    100% {
    background-color: #fff;
    width: 100%;
    }
}

@media only screen and (max-width:620px) {
  /* For mobile phones: */
  .left, .main, .right {
    width:100%;
  }
}
</style>
</head>
<body onload="init()" >

<div class="header">
  <font size="3"><?php
  setlocale(LC_TIME, 'ita', 'it_IT');
  echo utf8_encode (strftime("%A, %d %B %Y"));
  ?></font>
  <br><br>
  <table width="100%" border="0">
    <tr align="center">
      <td width="50%">

        </font><font size="6"><?php echo $temp_out; ?> °C</font><br>
        <image src='image/down.png' width=10><span class="min"> <?php echo $TempOutMin; ?>°</span> <image src='image/up.png' width=10> <span class="max"><?php echo $TempOutMax; ?>°</span>
       </td>
       <td align="center" >
         <image src=<?php echo $ico_meteo;?> width=50%></font>
       </td>
   </tr>
 </table>
 <table width="100%" border="0">
   <tr align="center">
        <td>
           <font size="2"><?php echo $txt_meteo . $txt_tendenza;?><br></td>
   </tr>
  </table>
</div>

<div style="overflow:auto">
  <div class="left">
    Aggiornato alle <?php echo date('H:i:s',strtotime($last_measure_time)) ?> <br>del <?php echo date('d/m/Y',strtotime($last_measure_time)); ?><br><br>
    <table width="100%" border="0">

    <tr><td align="center" ><image src='image/temperatura.png' width=30></td><td align="left">Percepita: <?php echo round($temp_apparent, 1); ?>°C
      <br> Punto di Rugiada: <?php echo round($dew_point, 1); ?>°C
      <br> System Temp.: <?php echo round($temp_in); ?>°C

    </td></tr>

    <tr><td align="center"><br><image src='image/umidita.png' width=30></td><td align="left"><br><?php echo $umidity; ?>%</td></tr>

    <tr><td align="center"><br><image src='image/pressione.png' width=30></td><td align="left"><br><?php echo $pressure; ?> hPa <image src=<?php echo $ico_tendenza;?> width=15> <br>Trend (3h): <?php echo round($trend,1);?> </td></tr>

    <tr><td align="center"><br><image src='image/pioggia.png' width=30></td><td align="left"><br><?php echo $rain1; ?> mm 1h
     <br><?php echo $rain24; ?> mm 24H
     <br><?php echo $rain_rate; ?>% Rate</td></tr>

    <tr><td align="center"><br><image src='image/vento.png' width=30></td><td align="left"><br><?php echo $wind_ave; ?> km/h da <?php echo $wind_dir_code; ?>
      <br><?php echo $wind_nome ." - ". $wind_vel_tipo; ?>
      <br>Max: <?php echo $winDayMax; ?> km/h
      <br>Raffica <?php echo $wind_gust; ?> km/h
      <br>Raffica max <?php echo $winDayGustMax; ?> km/h
      <br>T. del vento <?php echo round($wind_chill, 1); ?>°C</td></tr>

    <tr><td align="center"><br><image src='image/lux.png' width=30></td><td align="left"><br>Lux: <?php echo $Lux; ?>
      <div class="progressBar">
        <div class="progress">

        </div>
      </div>
        <br>IR: <?php echo round($Ir/($LuxFull/100)); ?>%</td></tr>

    </table>
    <br><br>
    <table width="100%" border="0">

       <tr height="200" align="center">
            <td style="background:url(http://francescocangiani.com/meteo/rv.png); background-repeat:no-repeat; background-position:center;">
               <canvas id="canvasRadial1" width="10" height="10"></canvas></td>
       </tr>
     </table>
     <script>
     var scroll = false;
     var winDirGauge;

         function init() {
             // Initialzing gauge

             winDirGauge = new steelseries.WindDirection('canvasRadial1', {
                                 size: 150,
                                 backgroundVisible: true,
                                 roseVisible: true,
                                 lcdVisible: false
                                 });

             winDirGauge.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);
             winDirGauge.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
             winDirGauge.setValueAnimatedLatest(<?php echo $wind_dir; ?>);
             winDirGauge.setValueAnimatedAverage(<?php echo $wind_dir_ave; ?>);
             winDirGauge.setPointerType(steelseries.PointerType.TYPE16);
             winDirGauge.setLcdColor(steelseries.LcdColor.STANDARD);
           }
     </script><br><br>

     Previsioni
     <div style="height:300px; overflow:scroll;">
     <table width="100%" border="0">
       <tr><td align="center" >
       <img style="-webkit-user-select: none;" src="http://www.foreca.it/meteogram.php?loc_id=103166350&amp;mglang=it&amp;units=metrickmh&amp;tf=24h">
      </td></tr>
     </table>
     </div>

     <br><br>Allerta Meteo
     <table width="100%" border="0">
       <tr>
         <td style="background:url(http://allarmi.meteo-allerta.it/images/map/campania_index.png); background-repeat:no-repeat; background-position:center;" width="100%" height="150px"></td>
         </tr>
      </table>

  </div>

  <div class="main">

  Observatory Cam <?php /*echo date('H:m:s - d/m/Y', $exifTimestamp)*/ ?>
  <table width="100%" border="0">
    <tr><td>
     <image src=<?php if($img_valid){echo $img_cam_path;}else{echo $img_no_available;}  ?> width=100% >
    </td></tr>
   </table><br>

   Immagini dal Satellite
   <table width="100%" border="0">
     <tr><td>
       <image src='https://sat24.mobi/Image/satir/europa/it' width=100% >
       <!--<image src='https://www.meteo60.fr/satellites/animation-satellite-ir-france.gif' width=100% >
      <image src='https://api.sat24.com/animated/IT/infraPolair/3/Central%20European%20Standard%20Time/4231854' width=100% >

    </br>Nuvole
    </br><image src='https://api.sat24.com/animated/IT/visual/1/Central%20European%20Standard%20Time/4455529' width=330 height=220>
    </br>Infrarosso
    </br><image src='https://api.sat24.com/animated/IT/infraPolair/1/Central%20European%20Standard%20Time/3219839' width=330 height=220>
    </br>Pioggia
    </br><image src='https://api.sat24.com/animated/IT/rainTMC/1/Central%20European%20Standard%20Time/8414767' width=330 height=220>
    </br>Neve
   </br><image src='https://api.sat24.com/animated/IT/snow/1/Central%20European%20Standard%20Time/6855405' width=330 height=220>-->
    </td></tr>
    </table><br>

   Dati astronomici del <?php echo date('d/m/Y'); ?>

    <table width='100%' border='0'>
       <tr><td>Inizio del crepuscolo</td><td><?php echo $inizio_crep;?> </td></tr>
       <tr><td>Fine del crepuscolo</td><td><?php echo $fine_crep;?></td></tr>
       <tr><td><br></td><td><br></td></tr>
       <tr><td>Ore di luce</td><td><?php echo $leng_day;?></td></tr>
       <tr><td>Durata crepuscolo+giorno</td><td><?php echo $leng_cpr;?></td></tr>
       <tr><td>Durata della notte astronomica</td><td><?php echo $le_night;?></td></tr>
       <tr><td><br></td><td><br></td></tr>
     </table><br>

    <span class='sun'>Effemeridi del Sole</span>
    <table width='100%' border='0'>
       <tr><td align='center' width='100'><image src='image/sunrise.png'></td><td align='center' width='100'><image src='image/suntop.png'></td><td align='center' width='100'><image src='image/sunset.png'></td></tr>
       <tr><td align='center'>Sorge</td><td align='center'>Culmine</td><td align='center'>Tramonta</td></tr>
       <tr><td align='center'><?php echo $sole_sorge;?></td><td align='center'><?php echo $sole_transita;?></td><td align='center'><?php echo $sole_tramonta;?></td></tr>
     </table><br>

    <span class='min'>Effemeridi della Luna</span>
       <br>Fase <?php echo $luna_fase;?> %
    <table width='100%' border='0'>
       <tr><td align='center' width='100'><image src='image/moonrise.png'></td><td align='center' width='100'><image src='image/moontop.png'></td><td align='center' width='100'><image src='image/moonset.png'></td></tr>
       <tr><td align='center'>Levata</td><td align='center'>Culmine</td><td align='center'>Calata</td></tr>
       <tr><td align='center'><?php echo $luna_sorge;?></td><td align='center'><?php echo $luna_transita;?></td><td align='center'><?php echo $luna_tramonta;?></td></tr>
     </table>

  </div>

  <div class="right">
    <?php require("graphics.php");?>
   </div>
</div>

<div class="footer">© copyright meteo.francescocangiani.com
  <form action=bar.php target="_blank">
    <input type="submit"value="Analogici">
  </form>
  <form action=minmax.php target="_blank">
    <input type="submit"value="Min & Max">
  </form>
  <form action=andamento_day.php target="_blank">
    <input type="submit"value="Andamento Oggi">
  </form>
  <form action=andamento_h.php target="_blank">
    <input type="submit"value="Andamento Ore">
  </form>
</div>

</body>
</html>
