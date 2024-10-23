<?php

require("settings.php");


$con = new SQLite3('/home/pi/meteopi/db/meteopi.s3db');

$sql = "SELECT * FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1";
$rainnow = "SELECT RAIN FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1 OFFSET 1";


$result = $con->query($sql);
$row = $result->fetchArray();

$result2 = $con->query($rainnow);
$row2 = $result2->fetchArray();

$data = date("d-m-Y");

$press_trend_3_6 = "SELECT `TIMESTAMP_LOCAL`,`PRESSURE` FROM  `METEO` WHERE  `TIMESTAMP_LOCAL` BETWEEN timestamp(DATE_SUB(NOW(), INTERVAL 6 HOUR)) AND timestamp(DATE_SUB(NOW(),INTERVAL 3 HOUR)) ORDER BY  `METEO`.`TIMESTAMP_LOCAL` DESC ";

$press_trend = "SELECT `TIMESTAMP_LOCAL`,`PRESSURE` FROM  `METEO` WHERE  `TIMESTAMP_LOCAL` > datetime('now', '-3 hours') ORDER BY  `METEO`.`TIMESTAMP_LOCAL` DESC ";
$result_press = $con->query($press_trend);


$i = 0;
while ( $row_press = $result_press->fetchArray() )
{
  if($i==0){
    $press_3h = $row_press[1];
    $press_max_3h = $row_press[1];
    $press_min_3h = $row_press[1];
  }
  if($row_press[1]>$press_max_3h)
    $press_max_3h = $row_press[1];

  if($row_press[1]<$press_min_3h)
    $press_min_3h = $row_press[1];

  $i = $i + 1;
}


//$result = mysqli_query($con,"SELECT * FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1") ;
//$row = mysqli_fetch_array($result);

//$result2 = mysql_query($con,"SELECT RAIN_RATE FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1 OFFSET 1") ;
//$row2 = mysqli_fetch_array($result2);
//$i2 = 0;
//while ($row) {
//    echo "$row[$i2] <br>";
//    $i2++;
//}

$last_measure_time = $row[0];
$wind_dir_code = $row[2]; //vento direzione punti cardinali
$wind_dir = $row[3];      //vento direzione gradi
$wind_ave = $row[4];      //vento velocità
$wind_gust = $row[5];     //vento raffica
$temp_out = $row[6];      //temperatura esterna
$pressure = $row[7];      //pressione
$umidity = $row[8];       //umidità
$rain = $row[9];         //pioggia totale
$rain_rate = $row[10];       //pioggia rate
$rain_tot = $row[35];      //pioggia 24h
$rain_1h = $row[36];      //pioggia 24h
$rain_24h = $row[37];      //pioggia 24h


$rain_now = $row[9]-$row2[0];      //pioggia in questo momento
//$rain_rate = $row[10];    //pioggia %
$temp_in = $row[11];      //temperatura interna
$hum_in = $row[12];       //umidità interna
#$umidity = $row[12];       //umidità interna

$wind_chill = $row[13];   //temperatura del vento
$temp_apparent = $row[14];//temperatura percepita
$dew_point = $row[15];    //punto di ruggiada
$uv = $row[16];           //uv del sole
$illuminance = $row[17];  //luminosità
$winDayMin = $row[18];    //vento h24 min
$winDayMax = $row[19];    //vento h24 max
$winDayGustMin = $row[20];//vento raffica min
$winDayGustMax = $row[21];//vento raffica max
$TempOutMin = $row[22];   //temperatura esterna min
$TempOutMax = $row[23];   //temperatura esterna max
$TempInMin = $row[24];    //temperatura interna min
$TempInMax = $row[25];    //temperatura interna max
$UmOutMin = $row[26];     //umidità esterna min
$UmOutMax = $row[27];     //umidità esterna max
$UmInMin = $row[28];      //umidità interna min
$UmInMax = $row[29];      //umidità interna max
$PressureMin = $row[30];  //pressione min
$PressureMax = $row[31];  //pressione max
$wind_dir_ave = $row[32]; //direzione media del vento          
$pm2 = $row[33];           //pm2.5
$pm10 = $row[34];          //pm10

?>


