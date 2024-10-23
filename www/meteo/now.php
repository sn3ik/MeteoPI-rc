<?php
require("config.php");

$con = new mysqli($server,$user,$pwd,$db);
//mysqli_select_db($con, $db) or die(mysqli_error($con));

$sql = "SELECT * FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1";
$rainnow = "SELECT RAIN_RATE FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1 OFFSET 1";

$result = $con->query($sql);
$row = $result->fetch_row();

$result2 = $con->query($rainnow);
$row2 = $result->fetch_row();

$data = date("d-m-Y");

//$result = mysqli_query($con,"SELECT * FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1") ;
//$row = mysqli_fetch_array($result);

//$result2 = mysql_query($con,"SELECT RAIN_RATE FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1 OFFSET 1") ;
//$row2 = mysqli_fetch_array($result2);


$last_measure_time = $row[0];
$wind_dir_code = $row[2]; //vento direzione punti cardinali
$wind_dir = $row[3];      //vento direzione gradi
$wind_ave = $row[4];      //vento velocità
$wind_gust = $row[5];     //vento raffica
$temp_out = $row[6];      //temperatura esterna
$pressure = $row[7];      //pressione
$umidity = $row[8];       //umidità
$rain = $row[9];         //pioggia totale
$rain_now = $row2[0]-$row[10];      //pioggia in questo momento
$rain_rate = $row[10];    //pioggia h24
$temp_in = $row[11];      //temperatura interna
$hum_in = $row[12];       //umidità interna
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

####################################
#                                  #
#     Riconoscimento del Vento     #
#                                  #
####################################

if($wind_dir_ave>22 && $wind_dir_ave<68){
  $wind_nome = "Grecale";
}else if($wind_dir_ave>67 && $wind_dir_ave<113){
  $wind_nome = "Levante";
}else if($wind_dir_ave>112 && $wind_dir_ave<158){
  $wind_nome = "Scirocco";
}else if($wind_dir_ave>157 && $wind_dir_ave<203){
  $wind_nome = "Ostro";
}else if($wind_dir_ave>202 && $wind_dir_ave<258){
  $wind_nome = "Libeccio";
}else if($wind_dir_ave>247 && $wind_dir_ave<293){
  $wind_nome = "Ponente";
}else if($wind_dir_ave>292 && $wind_dir_ave<338){
  $wind_nome = "Maestrale";
}else{
  $wind_nome = "Tramontana";
}

if($wind_ave<0.9){
  $wind_vel_tipo = "Calmo";
}else if($wind_ave>0.8 && $wind_ave<5.6){
  $wind_vel_tipo = "Bava di vento";
}else if($wind_ave>5.5 && $wind_ave<12.2){
  $wind_vel_tipo = "Brezza leggera";
}else if($wind_ave>12.1 && $wind_ave<19.7){
  $wind_vel_tipo = "Brezza tesa";
}else if($wind_ave>19.6 && $wind_ave<28.6){
  $wind_vel_tipo = "Vento moderato";
}else if($wind_ave>28.5 && $wind_ave<38.9){
  $wind_vel_tipo = "Vento teso";
}else if($wind_ave>38.8 && $wind_ave<49.9){
  $wind_vel_tipo = "Vento fresco";
}else if($wind_ave>49.8 && $wind_ave<61.8){
  $wind_vel_tipo = "Vento forte";
}else if($wind_ave>61.7 && $wind_ave<74.7){
  $wind_vel_tipo = "Burrasca";
}else if($wind_ave>74.6 && $wind_ave<88.1){
  $wind_vel_tipo = "Burrasca forte";
}else if($wind_ave>88.0 && $wind_ave<102.5){
  $wind_vel_tipo = "Tempesta";
}else if($wind_ave>102.4 && $wind_ave<117.1){
  $wind_vel_tipo = "Tempesta violenta";
}else {
  $wind_vel_tipo = "Uragano";
}

/*$vento = mysql_query("SELECT * FROM METEO WHERE TIMESTAMP_LOCAL BETWEEN TIMESTAMP( DATE_SUB( NOW( ) , INTERVAL 30 MINUTE ) ) AND TIMESTAMP( NOW( ) )");

while($row_wind = mysql_fetch_assoc($vento)){
  $wind_media = $wind_media + $row['WIND_DIR'];
  $wind_media_vel = $wind_media_vel + $row['WIND_AVE'];
  $cont = $cont + 1;
}*/

?>
<!DOCTYPE html>
<head>
  <meta charset="utf-8" />
  <title>Observatory Weather Station</title>
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" />
  <link rel="apple-touch-icon" href="icons/icon_iphone_x1.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="icons/icon_ipad_x2.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="icons/icon_iphone_x2.png" />
  <link rel="apple-touch-icon" sizes="144x144" href="icons/icon_ipad_x2.png" />
  <script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
  <script src="custom.js"></script>
  <script src="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>
  <script type="text/javascript" src="astrojs/astrojs.js"></script>


<meta name="viewport" content="width=device-width, initial-scale=1" />
<style type="text/css">
.max {
  color: red;
}
.min {
  color: lightblue;
}
.sun {
  color: yellow;
}

</style>

</head>

<body>
  <div data-role="page" data-theme="a">
    <div data-role="header">
      <h1>Observatory Weather Station</h1>
    </div>
    <div data-role="content">

      <form action=bar.php target="_blank">
        <input type="submit"value="Analogici">
      </form>
      <form action=andamento_day.php target="_blank">
        <input type="submit"value="Andamento 1Day">
      </form>
      <form action=pressure_1h.php target="_blank">
        <input type="submit"value="Andamento 1H">
      </form>


      <ul data-role="listview" data-inset="true" data-divider-theme="c">
	       <li data-role="list-divider">Aggiornato alle <?php echo date('H:i:s',strtotime($last_measure_time)) ?> del <?php echo date('d/m/Y',strtotime($last_measure_time)); ?></li>
         <li><table>

         <tr><td>Temperatura</td><td><?php echo $temp_out; ?>°C</td></tr>
         <tr><td>Temperatura percepita</td><td><?php echo round($temp_apparent, 1); ?>°C</td></tr>
         <tr><td></td><td>Min:<span class="min"> <?php echo $TempOutMin; ?>°C</span> Max: <span class="max"><?php echo $TempOutMax; ?>°C</span></td></tr>

         <tr><td>Umidità</td><td><?php echo $umidity; ?>%</td></tr>

         <tr><td>Vento</td><td><?php echo $wind_ave; ?> km/h da <?php echo $wind_dir_code; ?></td></tr>
         <tr><td></td><td><?php echo $wind_nome ." - ". $wind_vel_tipo; ?> </td></tr>

         <tr><td>Vento massimo di oggi</td><td><?php echo $winDayMax; ?> km/h</td></tr>
         <tr><td>Raffica</td><td><?php echo $wind_gust; ?> km/h </td></tr>
         <tr><td>Raffica massima</td><td><?php echo $winDayGustMax; ?> km/h</td></tr>
         <tr><td>Temperatura del vento</td><td><?php echo round($wind_chill, 1); ?>°C</td></tr>

         <tr><td>Pioggia ora</td><td><?php echo $rain_now; ?> mm</td></tr>
         <tr><td>Pioggia oggi</td><td><?php echo $rain_rate; ?> mm</td></tr>

         <tr><td>Pressione</td><td><?php echo $pressure; ?> hPa</td></tr>

         <tr><td>Punto di rugiada</td><td><?php echo round($dew_point, 1); ?>°C</td></tr>
         </table>
         </li>
       </ul>

       <ul data-role="listview" data-inset="true" data-divider-theme="c">
         <li data-role="list-divider">Immagini dal Satellite</li>
          </br><image src='https://api.sat24.com/animated/IT/infraPolair/1/Central%20European%20Standard%20Time/1215776' width=330 height=220>

          <!--</br>Nuvole
          </br><image src='https://api.sat24.com/animated/IT/visual/1/Central%20European%20Standard%20Time/4455529' width=330 height=220>
          </br>Infrarosso
          </br><image src='https://api.sat24.com/animated/IT/infraPolair/1/Central%20European%20Standard%20Time/3219839' width=330 height=220>
          </br>Pioggia
          </br><image src='https://api.sat24.com/animated/IT/rainTMC/1/Central%20European%20Standard%20Time/8414767' width=330 height=220>
          </br>Neve
        </br><image src='https://api.sat24.com/animated/IT/snow/1/Central%20European%20Standard%20Time/6855405' width=330 height=220>-->
       </ul>

       <ul data-role="listview" data-inset="true" data-divider-theme="c">
 	       <li data-role="list-divider">Dati astronomici del <?php echo date('d/m/Y'); ?></li>
         <li>
          <script language="JavaScript" type="text/javascript">

              var LAT=40.60;    // latitudine  del luogo di osservazione in gradi sessadecimali.
              var LON=14.35;    // longitudine del luogo di osservazione in gradi sessadecimali.
              var ALT=30;       // altitudine in metri sul livello del mare del luogo di osservazione.

              var njd=calcola_jd();
              //var njd=calcola_jddata(dd,mm,yy,hh,mi,se);  // calcola  il G.G. della data.
              var crep=crepuscolo_UT(njd,LON,LAT,ALT);    // calcola  il crepuscolo.
              var t_locale=hh_loc(1,njd);  //calcola le ore da aggiungere al T.U. per avere il tempo locale.

              var inizio_crep=crep[0]+t_locale; // inizio del crepuscolo in ore decimali (Tempo Locale).
              var   fine_crep=crep[1]+t_locale; // fine del crepuscolo in ore decimali (Tempo Locale).
              var    leng_day=crep[2];          // durata del giorno in ore decimali.
              var    leng_cpr=crep[3];          // durata crepuscolo+giorno in ore decimali.
              var    le_night=crep[4];          // durata della notte astronomica in ore decimali.

              //SOLE
              var njd2=calcola_jddata(03,10,2017,0,0,0);
              var dati_ast=ST_SOLE(njd,LON,LAT,ALT); // I tempi e gli azimut.

              var  sole_azimut_s=sc_angolo_gm(dati_ast[0],1); // Azimut del sorgere con 1 decimali.
              var  sole_azimut_t=sc_angolo_gm(dati_ast[1],1); // Azimut del tramontare con 1 decimali.
              var     sole_sorge=sc_ore_hm(dati_ast[2]+t_locale);   // Sorge in hh|mm.
              var  sole_transita=sc_ore_hm(dati_ast[3]+t_locale);   // Transita in hh|mm.
              var  sole_tramonta=sc_ore_hm(dati_ast[4]+t_locale);   // Tramonta in hh|mm.

              //Luna
              var dati_ast=ST_LUNA(njd,LON,LAT,ALT); // I tempi e gli azimut.
              var effemeridi=pos_luna(njd);
                              // Recupero dei dati dall'array dati_ast[] e formattazione.

              var  azimut_s=sc_angolo_gm(dati_ast[0],1); // Azimut del sorgere con 1 decimali.
              var  azimut_t=sc_angolo_gm(dati_ast[1],1); // Azimut del tramontare con 1 decimali.
              var     sorge=sc_ore_hm(dati_ast[2]+t_locale);   // Sorge in hh|mm.
              var  transita=sc_ore_hm(dati_ast[3]+t_locale);   // Transita in hh|mm.
              var  tramonta=sc_ore_hm(dati_ast[4]+t_locale);   // Tramonta in hh|mm.

              document.write("<table>");
              document.write("   <tr><td><span class='sun'>Effemeridi del Sole</span></td><td><br></td></tr>  ");
              document.write("   <tr><td>Inizio del crepuscolo</td><td>"+sc_ore_hm(inizio_crep)+"</td></tr>  ");
              document.write("   <tr><td>Sorge</td><td>"+sole_sorge+"</td></tr>  ");
              document.write("   <tr><td>Transita</td><td>"+sole_transita+"</td></tr>  ");
              document.write("   <tr><td>Tramonta</td><td>"+sole_tramonta+"</td></tr>  ");
              document.write("   <tr><td>Fine del crepuscolo</td><td>"+sc_ore_hm(fine_crep)+"</td></tr>  ");
              document.write("   <tr><td><br></td><td><br></td></tr>  ");
              document.write("   <tr><td>Ore di luce</td><td>"+sc_ore_hm(leng_day)+"</td></tr>  ");
              document.write("   <tr><td>Durata crepuscolo+giorno</td><td>"+sc_ore_hm(leng_cpr)+"</td></tr>  ");
              document.write("   <tr><td>Durata della notte astronomica</td><td>"+sc_ore_hm(le_night)+"</td></tr>  ");
              document.write("   <tr><td><br></td><td><br></td></tr>  ");
              document.write("   <tr><td><span class='min'>Effemeridi della Luna</span></td><td><br></td></tr>  ");
              document.write("   <tr><td>Levata</td><td>"+sorge+"</td></tr>  ");
              document.write("   <tr><td>Transita</td><td>"+transita+"</td></tr>  ");
              document.write("   <tr><td>Calata</td><td>"+tramonta+"</td></tr>  ");
              document.write("   <tr><td>Fase attuale</td><td>"+effemeridi[3].toFixed(2)+"</td></tr>  ");
              document.write(" </table>");



          </script>
          </li>
        </ul>



    </div>
    <div data-role="footer">

    </div>

</html>
