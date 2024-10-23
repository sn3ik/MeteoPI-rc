<?php
require("settings.php");

$con = new mysqli($server,$user,$pwd,$db);
//mysqli_select_db($con, $db) or die(mysqli_error($con));

//if (!$con)
//  {
//  die('Could not connect: ' . mysql_error());
//  }

$sql = "SELECT * FROM METEO ORDER BY `TIMESTAMP_LOCAL` DESC LIMIT 1";

// $today = date("dmY");

$result = $con->query($sql);
$row = $result->fetch_row();

$last_measure_time = $row[0];
$wind_dir_code = $row[2]; //vento direzione punti cardinali
$wind_dir = $row[3];      //vento direzione gradi
$wind_ave = $row[4];      //vento velocità
$wind_gust = $row[5];     //vento raffica
$temp_out = $row[6];      //temperatura esterna
$pressure = $row[7];      //pressione
$umidity = $row[8];       //umidità
$rain = $row[9];         //pioggia totale
$rain1 = $row[10];       //pioggia 1h
$rain24 = $row[11];      //pioggia 24h

$rain_now = $row[9]-$row2[0];      //pioggia in questo momento
$rain_rate = $row[12]-$row[12];    //pioggia %
$temp_in = $row[13];      //temperatura interna
$hum_in = $row[14];       //umidità interna
$wind_chill = $row[15];   //temperatura del vento
$temp_apparent = $row[16];//temperatura percepita
$dew_point = $row[17];    //punto di ruggiada
$uv = $row[18];           //uv del sole
$illuminance = $row[19];  //luminosità
$winDayMin = $row[20];    //vento h24 min
$winDayMax = $row[21];    //vento h24 max
$winDayGustMin = $row[22];//vento raffica min
$winDayGustMax = $row[23];//vento raffica max
$TempOutMin = $row[24];   //temperatura esterna min
$TempOutMax = $row[25];   //temperatura esterna max
$TempInMin = $row[26];    //temperatura interna min
$TempInMax = $row[27];    //temperatura interna max
$UmOutMin = $row[28];     //umidità esterna min
$UmOutMax = $row[29];     //umidità esterna max
$UmInMin = $row[30];      //umidità interna min
$UmInMax = $row[31];      //umidità interna max
$PressureMin = $row[32];  //pressione min
$PressureMax = $row[33];  //pressione max
$wind_dir_ave = $row[34]; //direzione media del vento
$Lux = $row[35];          //luce
$LuxFull = $row[36];      //luce + ir
$Ir = $row[37];           //ir
$cloud = ((((  ($row[6]-$row[17]) *1.8/4.5 ) * 1000 ) + ($alt * 3.2808) ) / 3.2808);

?>

<!DOCTYPE html>
<html manifest="demo.manifest"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Observatory Weather Station</title>
</head>
<body onload="init()" style="background-color:#dcdcdc">
    <table>
        <tbody>

          <tr>
            <td>
                <canvas id="canvasLinear8" width="320" height="140"></canvas><br>
                <canvas id="canvasLinear3" width="320" height="140"></canvas>
            </td>
          </tr>
        <tr valign="center">
             <td width="100%">
				        <canvas id="canvasRadial1" width="210" height="210"></canvas>
            </td>
        </tr>
        <!--<tr background="rosa.png">
             <td>
               <img src= "rosa.png">
            </td>
        </tr>-->
        <tr valign="center">
            <td width="100%">
              <canvas id="canvasRadial2" width="210" height="210"></canvas><br>
              <canvas id="canvasRadial3" width="210" height="210"></canvas><br>
              <canvas id="canvasRadial5" width="210" height="210"></canvas>
            </td>
        </tr>

    </tbody></table>


<script>

  var scroll = false;
  var winDirGauge;
	var windIntensityGustGauge;
	var windGustIntensityGauge;
	var tempGauge;
	var pressureGauge;
	var umidityGauge;
  var linear3;
  var linear8;



    function init() {
        // Initialzing gauge

		var sections = [steelseries.Section(0, 20, 'rgba(0, 0, 220, 0.3)'),
						steelseries.Section(20, 40, 'rgba(0, 220, 0, 0.3)'),
						steelseries.Section(40, 50, 'rgba(220, 220, 0, 0.3)'),
						steelseries.Section(50, 100, 'rgba(255, 0, 0, 0.3)')],
			// Define one area
			areas = [steelseries.Section(75, 100, 'rgba(220, 0, 0, 0.3)')],
			// Define value gradient for bargraph
			valGrad = new steelseries.gradientWrapper(  0,
														100,
														[ 0, 0.33, 0.66, 0.85, 1],
														[ new steelseries.rgbaColor(0, 0, 200, 1),
														  new steelseries.rgbaColor(0, 200, 0, 1),
														  new steelseries.rgbaColor(200, 200, 0, 1),
														  new steelseries.rgbaColor(200, 0, 0, 1),
														  new steelseries.rgbaColor(200, 0, 0, 1) ]);

		var sectionsPressute = [steelseries.Section(0, 800, 'rgba(0, 0, 220, 0.3)'),
								steelseries.Section(800, 850, 'rgba(0, 220, 0, 0.3)'),
								steelseries.Section(850, 900, 'rgba(220, 220, 0, 0.3)'),
								steelseries.Section(900, 1200, 'rgba(255, 0, 0, 0.3)')],
            // Define one area
            areas = [steelseries.Section(75, 100, 'rgba(220, 0, 0, 0.3)')],
            // Define value gradient for bargraph
            valGrad = new steelseries.gradientWrapper(  0,
                                                        100,
                                                        [ 0, 0.33, 0.66, 0.85, 1],
                                                        [ new steelseries.rgbaColor(0, 0, 200, 1),
                                                          new steelseries.rgbaColor(0, 200, 0, 1),
                                                          new steelseries.rgbaColor(200, 200, 0, 1),
                                                          new steelseries.rgbaColor(200, 0, 0, 1),
                                                          new steelseries.rgbaColor(200, 0, 0, 1) ]);

      linear8 = new steelseries.Linear('canvasLinear8', {
                            width: 320,
                            height: 140,
                            gaugeType: steelseries.GaugeType.TYPE2,
                            titleString: 'Temperatura',
                            unitString: 'C°',
                            lcdVisible: true,
                            digitalFont: true,
                            thresholdVisible: false,
                            minMeasuredValueVisible: true,
                            maxMeasuredValueVisible: true
                            });

      linear3 = new steelseries.Linear('canvasLinear3', {
                            width: 320,
                            height: 140,
                            titleString: "Umidità",
                            unitString: "%",
                            lcdVisible: true,
                            thresholdVisible: false,
                            minMeasuredValueVisible: true,
                            maxMeasuredValueVisible: true
                            });

        winDirGauge = new steelseries.WindDirection('canvasRadial1', {
                            size: 210,
                            backgroundVisible: true,
                            roseVisible: true,
                            lcdVisible: false
                            });

        windIntensityGauge = new steelseries.Radial('canvasRadial2', {
                            gaugeType: steelseries.GaugeType.TYPE3,
                            size: 210,
                            section: sections,
							minValue: 0,
							maxValue: 70,
                            useSectionColors: true,
							thresholdVisible: false,
							minMeasuredValueVisible: true,
							maxMeasuredValueVisible: true,
                            titleString: 'Wind Average',
                            unitString: 'km/h',
                            lcdVisible: true
                        });

		 windIntensityGustGauge = new steelseries.Radial('canvasRadial3', {
						gaugeType: steelseries.GaugeType.TYPE3,
						size: 210,
						section: sections,
						minValue: 0,
						maxValue: 70,
						useSectionColors: true,
						thresholdVisible: false,
						minMeasuredValueVisible: true,
						maxMeasuredValueVisible: true,
						titleString: 'Wind Gust',
						unitString: 'km/h',
						lcdVisible: true
					});





       pressureGauge = new steelseries.Radial('canvasRadial5', {
                            gaugeType: steelseries.GaugeType.TYPE3,
                            size: 210,
							minValue: 800,
							maxValue: 1200,
							minMeasuredValueVisible: true,
							maxMeasuredValueVisible: true,
							thresholdVisible: false,
                            titleString: 'Pressure',
                            unitString: 'hpa',
                            lcdVisible: true
                        });


    linear8.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);
    linear3.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);
		winDirGauge.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);
		windIntensityGauge.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);
		pressureGauge.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);
		windIntensityGustGauge.setFrameDesign(steelseries.FrameDesign.SHINY_METAL);

    linear8.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
    linear3.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
		winDirGauge.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
		windIntensityGauge.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
		pressureGauge.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
		windIntensityGustGauge.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
    //linear3.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);
    //linear8.setBackgroundColor(steelseries.BackgroundColor.BRUSHED_STAINLESS);



		winDirGauge.setValueAnimatedLatest(<?php echo $wind_dir; ?>);
    winDirGauge.setValueAnimatedAverage(<?php echo $wind_dir_ave; ?>);
    winDirGauge.setPointerType(steelseries.PointerType.TYPE16);
    winDirGauge.setLcdColor(steelseries.LcdColor.STANDARD);

		windIntensityGauge.setValueAnimated(<?php echo $wind_ave; ?>);
  	windIntensityGauge.setMinMeasuredValue(<?php echo $winDayMin; ?>);
  	windIntensityGauge.setMaxMeasuredValue(<?php echo $winDayMax; ?>);
    windIntensityGauge.setPointerType(steelseries.PointerType.TYPE16);

		windIntensityGustGauge.setValueAnimated(<?php echo $wind_gust; ?>);
 		windIntensityGustGauge.setMinMeasuredValue(<?php echo $winDayGustMin; ?>);
  	windIntensityGustGauge.setMaxMeasuredValue(<?php echo $winDayGustMax; ?>);
    windIntensityGustGauge.setPointerType(steelseries.PointerType.TYPE16);

    linear8.setValueAnimated(<?php echo $temp_out; ?>);
    linear8.setMinMeasuredValue(<?php echo $TempOutMin; ?>);
    linear8.setMaxMeasuredValue(<?php echo $TempOutMax; ?>);


    linear3.setValueAnimated(<?php echo $umidity; ?>);
    linear3.setMinMeasuredValue(<?php echo $UmOutMin; ?>);
    linear3.setMaxMeasuredValue(<?php echo $UmOutMax; ?>);

    pressureGauge.setValueAnimated(<?php echo $pressure; ?>);
    pressureGauge.setMinMeasuredValue("1012");
    pressureGauge.setMaxMeasuredValue("1050");
    pressureGauge.setPointerType(steelseries.PointerType.TYPE16);

	}


</script>
<?php echo $wind_dir; ?><br>
<?php echo $wind_dir_ave; ?>
<script src="js/tween-min.js"></script>
<script src="js/steelseries-min.js"></script>
</body></html>
