<?php
$active_page = 'meteopi';

	include_once('./include/config.php');
    include ('readcfg.php');
	
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="shortcut icon" href="./static/images/raspberry.png" type="image/png" />
	<link rel="icon" href="./static/images/raspberry.png" type="image/png" />
	<title>Raspberry PI</title>
	<link href="./static/css.php" rel="stylesheet" type="text/css">
	<script src="./static/js.php" type="text/javascript">
</script>

<style>

		ul#tabs { list-style-type: none; margin: 30px 0 0 0; padding: 0 0 0.3em 0; }
		ul#tabs li { display: inline; }
		ul#tabs li a { color: #42454a; background-color: #dedbde; border: 1px solid #c9c3ba; border-bottom: none; padding: 0.3em; text-decoration: none; }
		ul#tabs li a:hover { background-color: #808080; }
		ul#tabs li a.selected { color: #000; background-color: #f1f0ee; font-weight: bold; padding: 0.7em 0.3em 0.38em 0.3em; }
		div.tabContent { border: 1px solid #c9c3ba; padding: 0.5em; background-color: #f1f0ee; }
		div.tabContent.hide { display: none; }
</style>
	
</head>

<body>
<div class="container">
	
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="./index.php"><img src="./static/images/raspberry.png" /></a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				<ul class="nav navbar-nav navbar-right">
					<?php
						include_once('./include/menu.php');
					?>
				</ul>
			</div><!--/.nav-collapse -->
		</div><!--/.container-fluid -->
	</nav>

<body onload="init()">
    <script>
	 var tabLinks = new Array();
     var contentDivs = new Array();
	
	  function showTab() {
      var selectedId = getHash( this.getAttribute('href') );

      for ( var id in contentDivs ) {
        if ( id == selectedId ) {
          tabLinks[id].className = 'selected';
          contentDivs[id].className = 'tabContent';
        } else {
          tabLinks[id].className = '';
          contentDivs[id].className = 'tabContent hide';
        }
      }
      return false;
    }
	   function getFirstChildWithTagName( element, tagName ) {
      for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
      }
    }
	 function getHash( url ) {
      var hashPos = url.lastIndexOf ( '#' );
      return url.substring( hashPos + 1 );
    }
	
    function init() {

      var tabListItems = document.getElementById('tabs').childNodes;
      for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
          var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
          var id = getHash( tabLink.getAttribute('href') );
          tabLinks[id] = tabLink;
          contentDivs[id] = document.getElementById( id );
        }
      }
      var i = 0;

      for ( var id in tabLinks ) {
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) tabLinks[id].className = 'selected';
        i++;
      }

      var i = 0;

      for ( var id in contentDivs ) {
        if ( i != 0 ) contentDivs[id].className = 'tabContent hide';
        i++;
      }
    }

        function ButtonLog_onclick() {
            popupwindow('/logs.php','Log','800','600')
        }

        function ButtonDownloadCFG_onclick() {
            
            window.location = '/download.php?file=meteopi.cfg&path=/home/pi/meteopi/'
        }

        function ButtonUploadCFG_onclick() {
            popupwindow('/upload.php','Upload cfg','800','600')
        }        
        
        function ButtonRestoreCFG_onclick() {
            
        var r = confirm("Restore original config file?");
            if(r == true){
                <?php
                

                    $file = '/var/www/html/meteopi/meteopi_bck.cfg';
                    $newfile = '/var/www/html/meteopi/meteopi.cfg';
                    //copy($file, $newfile);
                    

                ?>
            
            }
        }    

        function ButtonStatus_onclick() {
            popupwindow('/readlog.php','Log','800','600')

        }
        function popupwindow(url, title, w, h) {
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
        } 

        function WeatherUnderground_logdata_onclick() {

        }
        
        function execute_button(button_id)
		{
			jQuery('#button-id-'+button_id).prop('disabled', true);
			jQuery.ajax({ 
				type: 'POST', 
				url: 'ajax.php', 
				data: {'action':'execute_button','button_id':button_id},
				dataType:'text',
				success: function (data) { 
					alert(data);
					jQuery('#button-id-'+button_id).prop('disabled', false);
				}
			});
			
		}

    </script>
    <script type="text/javascript" src="jscolor/jscolor.js"></script>

    <div id="Header">
        
                <div class="panel-body" align="center">

						<?php
							if(!empty($message))
							{
								echo '<div class="alert alert-info" role="alert" style="margin-bottom:20px;">'.$message.'</div>';
							}	
						
						if(file_exists('./buttons/buttons.json'))
						{
							$contents = file_get_contents('./buttons/buttons.json');
							$json_arr = json_decode($contents,true);
															
							for($i=0;$i<count($json_arr);$i++)
							{
								if($i < 3)
								{	
									
									echo '<div class="btn-group" role="group" aria-label="...">';
									echo '<button style="width:150px" onclick="javascript:execute_button(\''.$i.'\');" type="button" id="button-id-'.$i.'" class="'.$json_arr[$i]['button_style'].' '.$json_arr[$i]['button_size'].'" data-toggle="tooltip" data-original-title="'.$json_arr[$i]['button_command'].'">';
									if(!empty($json_arr[$i]['button_icon']))
									echo '<i class="fa '.$json_arr[$i]['button_icon'].'" aria-hidden="true"></i> ';
									echo $json_arr[$i]['button_title'];
									echo '</button>';																
									echo '</div> ';
								}
							}															
						}
					
						?>						
					</div>			
        
        <div id="Buttons" style= "margin-top: 23px">
            
            <input id="ButtonLog" type="button" value="Download Log Files" onclick="return ButtonLog_onclick()" />
            <input id="ButtonDownloadCFG" type="button" value="Save Configuration File" onclick="return ButtonDownloadCFG_onclick()" />
            <input id="ButtonUploadCFG" type="button" value="Upload Configuration File" onclick="return ButtonUploadCFG_onclick()" />
            <input id="ButtonRestoreCFG" type="button" value="Restore Configuration File" onclick="return ButtonRestoreCFG_onclick()"/>

            <input id="ButtonStatus" type="button" value="Real-Time Log" onclick="return ButtonStatus_onclick()"/>				

            <form id="ConfigForm" action="updatecfg.php" method="post">
        </div>       
	</div>

        <ul id="tabs">
            <li><a href="#General">General</a></li>
            <li><a href="#Sensors">Sensors</a></li>
          	<li><a href="#WebCam">Image</a></li>
			<li><a href="#RTL-SDR">RTL-SDR</a></li>			
        	<li><a href="#Security">Security</a></li>	
        	<li><a href="#DataLogging">DataLogging</a></li>
        	<li><a href="#Weather">Weather</a></li>
        	<li><a href="#Upload">Upload/ftp</a></li>
        	<li><a href="#Mail">Mail</a></li>	 
        	<li><a href="#DynDNS">DynDNS</a></li>
        </ul>

    <!-- GENERAL -->

	<div class="tabContent" id="General">
	        <table border="1" frame="box" style=" margin-right: 0px" width="100%" >
			<tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large;">
                    <font color="#000000">General</font></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style10" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color="#000000">Station name</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="station_name" type="text" name="station_name" value="<?php echo $station_name_data; ?>" style="width: 100%" height="30px" bgcolor="#d3d3d3"/></font></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style10" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Latitude of MeteoPI in decimal degree</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="location_latitude" type="text" name="location_latitude" value="<?php echo $location_latitude_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style11" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Longitude of MeteoPI in decimal degree</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="location_longitude" type="text" name="location_longitude" value="<?php echo $location_longitude_data; ?>" onclick="return location_longitude_onclick()" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style11" width="800" height="30px" bgcolor="#d3d3d3" >
                    <font color=#000000>Altitude of MeteoPI in meters</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="location_altitude" type="text" name="location_altitude" value="<?php echo $location_altitude_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Reboot system every day at specified time. Ex 08:00 or &quot;None&quot; for not rebooting</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="reboot_at" type="text" name="reboot_at" value="<?php echo $reboot_at_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Shutdown system every day at specified time. Ex&nbsp; 08:00&nbsp;or &quot;None&quot; for not shutdown&nbsp; </font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="shutdown_at" type="text" name="shutdown_at" value="<?php echo $shutdown_at_data; ?>" style="width: 100%" /></td>
            </tr>
			
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Shutdown system every day at the specified hours before sunset. Use &quot;None&quot; for not using this function.</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="shutdown_hour_before_sunset" type="text" name="shutdown_hour_before_sunset" value="<?php echo $shutdown_hour_before_sunset_data; ?>" style="width: 100%" /></td>
            </tr>
			
			<tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Set time at boot ( None for not using this function . es 08:00 </font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="set_time_at_boot" type="text" name="set_time_at_boot" value="<?php echo $set_time_at_boot_data; ?>" style="width: 100%" /></td>
            </tr>			
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Adjust system time from a NTP internt server at system startup </font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <select id="set_system_time_from_ntp_server_at_startup" name="set_system_time_from_ntp_server_at_startup" style="width: 100%"> 
                         <option value=True <?php if (trim('True') == trim($set_sistem_time_from_ntp_server_at_startup_data)) echo 'selected'; ?>>True</option>
                         <option value=False <?php if (trim('False') == trim($set_sistem_time_from_ntp_server_at_startup_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Set time by url for time adjustemnt. (ntp-url).time.php&lt;?=date(&quot;D M j G:i:s Y&quot;);?&gt;</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="ntp_url" type="text" name="ntp_url" value="<?php echo $ntp_url_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>NTP servet for time adjustemnt.</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <input id="ntp_server" type="text" name="ntp_server" value="<?php echo $ntp_server_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Reset the wifi interface if detecting a connection problem </font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <select id="wifi_reset_if_down" type="text" name="wifi_reset_if_down" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($wifi_reset_if_down_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($wifi_reset_if_down_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style12" width="800" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Wind speed units</font></td>
                <td style="padding:5px" class="style45" height="30px" bgcolor="#d3d3d3">
                    <select id="wind_speed_units" type="text" name="wind_speed_units" style="width: 100%" >
                         <option value=kmh <?php if (trim('kmh') == trim($wind_speed_units_data)) echo 'selected'; ?>>kmh</option>
                         <option value=knots <?php if (trim('knots') == trim($wind_speed_units_data)) echo 'selected'; ?>>knots</option>
                    </select></td>
            </tr>
        </table>
	</div>

    <!-- SENSORS -->

	<div class="tabContent" id="Sensors">  
        
        <table border="1" frame="box" style=" margin-right: 0px" width="100%">
            <tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color: #000000;">
                    <font color=#000000>Sensors</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52"  height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a weather station</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_wind_sensor" type="text" name="use_wind_sensor" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_wind_sensor_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_wind_sensor_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Weather Station model</font></td>
                <td style="padding:5px" class="style49" height="30px" bgcolor="#d3d3d3">
                    <select id="sensor_type" type="text" name="sensor_type" style="width: 100%" >
                        <option value="NONE" <?php if (trim('NONE') == trim($sensor_type_data)) echo 'selected'; ?>>None</option>                                   
                        <option value="SIMULATE" <?php if (trim('SIMULATE') == trim($sensor_type_data)) echo 'selected'; ?> >SIMULATE</option>
                        <option value="PCE-FWS20" <?php if (trim('PCE-FWS20') == trim($sensor_type_data)) echo 'selected'; ?>>PCE-FWS20</option>
                        <option value="WH1080-RFM01" <?php if (trim('"WH1080-RFM01') == trim($sensor_type_data)) echo 'selected'; ?>>WH1080-RFM01</option>
						<option value="WH1080_RTL-SDR" <?php if (trim('WH1080_RTL-SDR') == trim($sensor_type_data)) echo 'selected'; ?>>WH1080_RTL-SDR</option>
                        <option value="WH4000_RTL-SDR" <?php if (trim('WH4000_RTL-SDR') == trim($sensor_type_data)) echo 'selected'; ?>>WH4000_RTL-SDR</option>
						<option value="WMR100" <?php if (trim('WMR100') == trim($sensor_type_data)) echo 'selected'; ?>>WMR100</option>
						<option value="WMR200" <?php if (trim('WMR200') == trim($sensor_type_data)) echo 'selected'; ?>>WMR200</option>
						<option value="WMR918" <?php if (trim('WMR918') == trim($sensor_type_data)) echo 'selected'; ?>>WMR918</option>
						<option value="WM918" <?php if (trim('WM918') == trim($sensor_type_data)) echo 'selected'; ?>>WM918</option>		
						<option value="WS23XX" <?php if (trim('WS23XX') == trim($sensor_type_data)) echo 'selected'; ?>>WS23XX</option>	
						<option value="NEVIO2" <?php if (trim('NEVIO2') == trim($sensor_type_data)) echo 'selected'; ?>>NEVIO2</option>			
						<option value="NEVIO4" <?php if (trim('NEVIO4') == trim($sensor_type_data)) echo 'selected'; ?>>NEVIO4</option>					
                        <option value="NEVIO8" <?php if (trim('NEVIO8') == trim($sensor_type_data)) echo 'selected'; ?>>NEVIO8</option>
                        <option value="NEVIO16" <?php if (trim('NEVIO16') == trim($sensor_type_data)) echo 'selected'; ?>>NEVIO16</option>         
                        <option value="NEVIO16S" <?php if (trim('NEVIO16S') == trim($sensor_type_data)) echo 'selected'; ?>>NEVIO16S</option>    
                        <option value="NEVIO16W" <?php if (trim('NEVIO16W') == trim($sensor_type_data)) echo 'selected'; ?>>NEVIO16W</option>    
                        <option value="PCE-SENSOR" <?php if (trim('PCE-SENSOR') == trim($sensor_type_data)) echo 'selected'; ?>>PCE-SENSOR</option>
                        <option value="DAVIS-SENSOR" <?php if (trim('DAVIS-SENSOR') == trim($sensor_type_data)) echo 'selected'; ?>>DAVIS-SENSOR</option> 
                        <option value="DAVIS-VANTAGE-PRO2" <?php if (trim('DAVIS-VANTAGE-PRO2') == trim($sensor_type_data)) echo 'selected'; ?>>DAVIS-VANTAGE-PRO2</option>  
                        <option value="LACROSS-TX23" <?php if (trim('LACROSS-TX23') == trim($sensor_type_data)) echo 'selected'; ?>>LACROSS-TX23</option>    
                        <option value="W831" <?php if (trim('W831') == trim($sensor_type_data)) echo 'selected'; ?>>W831</option>    
                    </select></td>  
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Number of measure for wind average gust calculation.</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="number_of_measure_for_wind_average_gust_calculation" type="text" name="number_of_measure_for_wind_average_gust_calculation" value=<?php echo $number_of_measure_for_wind_average_gust_calculation_data; ?>
                        style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Number of measure for wind dir average calculation.</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="number_of_measure_for_wind_dir_average" type="text" name="number_of_measure_for_wind_dir_average" value=<?php echo $number_of_measure_for_wind_dir_average_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Calibration gain for wind intensity calculation </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="windspeed_gain" type="text" name="windspeed_gain" value=<?php echo $windspeed_gain_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Calibration offset for wind intensity calculation </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="windspeed_offset" type="text" name="windspeed_offset" value=<?php echo $windspeed_offset_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Interval between measurements</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="windmeasureinterval" type="text" name="windmeasureinterval" value=<?php echo $windmeasureinterval_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a BMP085 sensor for pressure and temperature </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_bmp085" type="text" name="use_bmp085" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_bmp085_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_bmp085_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>

            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a BME280 Pressure-temperature-Umidity </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_bme280" type="text" name="use_bme280" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_bme280_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_bme280_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>

            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a TLS2591 Light Sensor </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_tsl2591" type="text" name="use_tsl2591" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_tsl2591_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_tsl2591_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a SDS011 PM Air Quality Sensor </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_sds011" type="text" name="use_sds011" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_sds011_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_sds011_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>

            <tr>   
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a TMP36 sensor for temperature </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_tmp36" type="text" name="use_tmp36" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_tmp36_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_tmp36_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>   
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use DHT humidity-Temperature sensor</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="use_dht" type="text" name="use_dht" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_dht_data)) echo 'selected'; ?> >True</option>
                        <option value=False <?php if (trim('False') == trim($use_dht_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>   
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>DHT type</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="dht_type" type="text" name="dht_type" style="width: 100%" >
                        <option value="DHT11" <?php if (trim('DHT11') == trim($dht_type_data)) echo 'selected'; ?>>DHT11</option>
                        <option value="DHT22" <?php if (trim('DHT22') == trim($dht_type_data)) echo 'selected'; ?>>DHT22</option>
                        <option value="AM2302" <?php if (trim('AM2302') == trim($dht_type_data)) echo 'selected'; ?>>AM2302</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Number of measure for wind trend calculation.</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="Text1" type="text" name="number_of_measure_for_wind_trend" value=<?php echo $number_of_measure_for_wind_trend_data; ?> style="width: 100%" /></td>
            </tr>
				<td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Wind trend limits </font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <input id="Text2" type="text" name="wind_trend_limit" value=<?php echo $wind_trend_limit_data; ?> style="width: 100%" /></td>
            </tr>
               <tr>   
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Solar Sensor ( <b>Davis-Vantage-Pro2</b>)</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="solarsensor" type="text" name="solarsensor"style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($solarsensor_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($solarsensor_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>   
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>UV Sensor ( <b>Davis-Vantage-Pro2</b>)</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="uvsensor" type="text" name="uvsensor"style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($uvsensor_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($uvsensor_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            </table> 
    <br />
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color:#000000;">PCE-FWS20</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Synchronize system time from PCE station</font></td>
                <td style="padding:5px" class="style32" height="30px" bgcolor="#d3d3d3">
                    <select  id="set_system_time_from_WeatherStation" type="text" name="set_system_time_from_WeatherStation" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($set_system_time_from_weatherstation_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($set_system_time_from_weatherstation_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            </table>
    <br />
			   <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color: #000000;">Serial Sensor </td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Serial port of serial sensors ( WM918, WMR918 )&nbsp; </font></td>
                <td style="padding:5px" class="style32" height="30px" bgcolor="#d3d3d3">
                    <input id="sensor_serial_port" type="text" name="sensor_serial_port" value=<?php echo $sensor_serial_port_data; ?> style="width: 100%" /></td>
            </tr>
            </table>
    <br />
	</div>

    <!-- IMAGE -->

	<div class="tabContent" id="WebCam"> 
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color:#000000;">WebCam - Camera</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style26" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Time interval between webcam and Cameras captures </font></td>
                <td style="padding:5px" class="style27" height="30px" bgcolor="#d3d3d3">
                    <input id="WebCamInterval" type="text" name="WebCamInterval" value="<?php echo $webcaminterval_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Send captured images to a web serverthrow FTP</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <select  id="sendImagesToServer" type="text" name="sendImagesToServer" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($sendimagestoserver_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($sendimagestoserver_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Send all captured images to re server . This require a dinamic web server with PHP </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <select  id="sendallimagestoserver" type="text" name="sendallimagestoserver" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($sendallimagestoserver_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($sendallimagestoserver_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style50" height="30px" bgcolor="#d3d3d3"> 
                    <font color=#000000>Delete images after sent to server</font></td>
                <td style="padding:5px" class="style51" height="30px" bgcolor="#d3d3d3">
                    <select  id="delete_images_on_sd" type="text" name="delete_images_on_sd" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($delete_images_on_sd_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($delete_images_on_sd_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam device 1. Tipicaly /dev/video0 or None to not use a webcam</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamDevice1" type="text" name="webcamDevice1" value=<?php echo $webcamdevice1_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam device 2. Tipicaly /dev/video1 or None to not use a webcam</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamDevice2" type="text" name="webcamDevice2" value=<?php echo $webcamdevice2_data; ?> style="width: 100%" /></td>
            </tr>
			</table>
	     <br/>		
		<table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
			<tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color: #000000;">Logo-Resolution-Capture Program</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Logo to write into the images</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamLogo" type="text" name="webcamLogo" value=<?php echo $webcamlogo_data; ?>  style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam 1 capture resolution. ex 800x600. </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamdevice1captureresolution" type="text" name="webcamdevice1captureresolution" value=<?php echo $webcamdevice1captureresolution_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam 2 capture resolution. ex 800x600.</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamdevice2captureresolution" type="text" name="webcamdevice2captureresolution" value=<?php echo $webcamdevice2captureresolution_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam 1 final resolution. ex 800x600. </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamdevice1finalresolution" type="text" name="webcamdevice1finalresolution" value=<?php echo $webcamdevice1finalresolution_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam 2 final resolution. ex 800x600. </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="webcamdevice2finalresolution" type="text" name="webcamdevice2finalresolution" value=<?php echo $webcamdevice2finalresolution_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Webcam Capture program </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <select id="captureprogram" type="text" name="captureprogram" value=<?php echo $captureprogram_data; ?> style="width: 100%" >
                        <option value="ffmpeg" >ffmpeg</option>
                        <option value="uvccapture" >uvccapture</option>
                        <option value="fswebcam">fswebcam</option>
                    </select> </td>
            </tr>
            </table>
     <br />

        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color: #000000;">Camera</td>
            </tr>
            <tr>   
                <td style="padding:5px" class="style26" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use Camera. If True the system will try to detect</font></td>
                <td style="padding:5px" class="style28" height="30px" bgcolor="#d3d3d3">
                    <select  id="usecameradivice" type="text" name="usecameradivice" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($usecameradivice_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($usecameradivice_data)) echo 'selected'; ?>>False</option>
                    </select> </td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Camera final resolution. ex 800x600</font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <input id="cameradivicefinalresolution" type="text" name="cameradivicefinalresolution" value=<?php echo $cameradivicefinalresolution_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Day Capture option. Use an element list for each camera</font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <input id="gphoto2options" type="text" name="gphoto2options" value=<?php echo $gphoto2options_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Night Capture option. Use an element list for each camera</font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <input id="gphoto2options_Night" type="text" name="gphoto2options_Night" value=<?php echo $gphoto2options_night_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Before capturing reset the USB. For Nikon cameras</font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <select  id="reset_usb" type="text" name="reset_usb" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($reset_usb_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($reset_usb_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Clear cameras SD card at startup </font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <select id="clear_all_sd_cards_at_startup" type="text" name="clear_all_sd_cards_at_startup" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($clear_all_sd_cards_at_startup_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($clear_all_sd_cards_at_startup_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Stat numbering cameras from </font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <input id="start_camera_number" type="text" name="start_camera_number" value=<?php echo $start_camera_number_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use gphoto2 capture_and_download </font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <select id="gphoto2_capture_image_and_download" type="text" name="gphoto2_capture_image_and_download" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($gphoto2_capture_image_and_download_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($gphoto2_capture_image_and_download_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a camera resetter connected to the GPIO </font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <select id="use_camera_resetter" type="text" name="use_camera_resetter" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_camera_resetter_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_camera_resetter_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Resetter PIN ( GPIO24 ) </font></td>
                <td style="padding:5px" class="style34" height="30px" bgcolor="#d3d3d3">
                    <select id="camera_resetter_normaly_on" type="text" name="camera_resetter_normaly_on" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($camera_resetter_normaly_on_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($camera_resetter_normaly_on_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
                <tr>   
                <td style="padding:5px" class="style52" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Power On-Off Camera</font></td>
                <td style="padding:5px" class="style31" height="30px" bgcolor="#d3d3d3">
                    <select id="on_off_camera" type="text" name="on_off_camera" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($on_off_camera_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($on_off_camera_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            </table>
    <br />

        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">Camera PI</td>
            </tr>
           <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use Camera PI</font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="use_cameraPI" type="text" name="use_cameraPI" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_camerapi_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_camerapi_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>	
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Day Capture option </font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="cameraPI_day_settings" type="text" name="cameraPI_day_settings" value="<?php echo $camerapi_day_settings_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Night Capture option</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="cameraPI_night_settings" type="text" name="cameraPI_night_settings" value="<?php echo $camerapi_night_settings_data; ?>" style="width: 100%" /></td>
            </tr>

            <tr>
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Time Lapse</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <select id="cameraPI_timelapse" type="text" name="cameraPI_timelapse" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($camerapi_timelapse_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($camerapi_timelapse_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Time Lapse options (Width, Height, Quality, Frames, Interval seconds)</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="cameraPI_timelapse_settings" type="text" name="cameraPI_timelapse_settings" value="<?php echo $camerapi_timelapse_settings_data; ?>" style="width: 100%" /></td>
            </tr>
            </table>
    <br />
			<table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
			<tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color: #000000;">
                    <font color=#000000>IP Cam</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style26" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Time interval between IPCam captures</font></td>
                <td style="padding:5px" class="style27" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamInterval" type="text" name="IPCamInterval" value=<?php echo $ipcaminterval_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3"> 
	                    <font color=#000000>IP CAM Configuration</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <select id="IPCamCfg" type="text" name="IPCamCfg" value=<?php echo $ipcamcfg_data; ?> style="width: 100%" tabindex="1">
                        <option value="None" <?php if (trim('None') == trim($ipcamcfg_data)) echo 'selected'; ?>>None</option>						
                        <option value="IPCam1" <?php if (trim('IPCam1') == trim($ipcamcfg_data)) echo 'selected'; ?>>IPCam1 N-NE-E-SE-S-SW-W-NW</option>
                        <option value="IPCam2" <?php if (trim('IPCam2') == trim($ipcamcfg_data)) echo 'selected'; ?>>IPCam1 N-NE-E-SE-S-SW-W-NW+IPCam2 Fixed(two snapshot)</option>
                        <option value="Combined" <?php if (trim('Combined') == trim($ipcamcfg_data)) echo 'selected'; ?>>Combined IPCam1 (N-NE-E-SE) + IPCam2 (S-SW-W-NW)</option>
					</select> </td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>IP address of IPCam 1</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamIP1" type="text" name="IPCamIP1" value=<?php echo $ipcamip1_data; ?> style="width: 100%" /></td>        
			</tr>
			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>User of IPCam 1 </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamUS1" type="text" name="IPCamUS1" value=<?php echo $ipcamus1_data; ?> style="width: 100%" /></td>        
			</tr>
			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Password of IPCam 1</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPW1" type="text" name="IPCamPW1" value=<?php echo $ipcampw1_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Snapshot CGI Command for IPCam1 </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamSN1" type="text" name="IPCamSN1" value=<?php echo $ipcamsn1_data; ?> style="width: 100%" /></td>        
            </tr>          
			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>IP address of IPCam 2</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamIP2" type="text" name="IPCamIP2" value=<?php echo $ipcamip2_data; ?> style="width: 100%" /></td>        
			</tr>				
 			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>User of IPCam 2</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamUS2" type="text" name="IPCamUS2" value=<?php echo $ipcamus2_data; ?> style="width: 100%" /></td>        
			</tr>
			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Password of IPCam 2 </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPW2" type="text" name="IPCamPW2" value=<?php echo $ipcampw2_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Snapshot CGI Command for IPCam2 </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamSN2" type="text" name="IPCamSN2" value=<?php echo $ipcamsn2_data; ?> style="width: 100%" /></td>        
            </tr>            
			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Sleep Time in second After IPCam Running</font></td>
                <td style="padding:5px" class="style26" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamZZZ" type="text" name="IPCamZZZ" value=<?php echo $ipcamzzz_data; ?> style="width: 100%" /></td>        
			</tr>			
			<tr>
                <td style="padding:5px" class="style25" colspan="2" style="font-size: large; color: #000000;">IPCam2 is only fixed if not combined with IPCam1</td>
            </tr>
			<tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>North position CGI Command IPCam1 or None to not use a IPCam positioning</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosN" type="text" name="IPCamPosN" value=<?php echo $ipcamposn_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>NorthEast position CGI Command IPCam1 or None to not use a IPCam positioning</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosNE" type="text" name="IPCamPosNE" value=<?php echo $ipcamposne_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>East position CGI Command IPCam1 or None to not use a IPCam positioning </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosE" type="text" name="IPCamPosE" value=<?php echo $ipcampose_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>SouthEast position CGI Command IPCam1 or None to not use a IPCam positioning </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosSE" type="text" name="IPCamPosSE" value=<?php echo $ipcamposse_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>South position CGI Command IPCam1/single-IPCam2/combined or None to not use a IPCam positioning </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosS" type="text" name="IPCamPosS" value=<?php echo $ipcamposs_data; ?> style="width: 100%" /></td>        
			</tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>SouthWest position CGI Command IPCam1/single-IPCam2/combined or None to not use a IPCam positioning </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosSW" type="text" name="IPCamPosSW" value=<?php echo $ipcampossw_data; ?> style="width: 100%" /></td>        
			</tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>West position CGI Command IPCam1/single-IPCam2/combined or None to not use a IPCam positioning </font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosW" type="text" name="IPCamPosW" value=<?php echo $ipcamposw_data; ?> style="width: 100%" /></td>        
			</tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>NorthWest position CGI Command IPCam1/single-IPCam2/combined or None to not use a IPCam positioning</font></td>
                <td style="padding:5px" class="style33" height="30px" bgcolor="#d3d3d3">
                    <input id="IPCamPosNW" type="text" name="IPCamPosNW" style="width: 100%" value=<?php echo $ipcamposnw_data; ?> /></td>      
			</tr>
		</table>		
	</div>
	
    <!-- RTL-SDR -->

    <div class="tabContent" id="RTL-SDR"> 	
             
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">RTL2832-based USB DVB-T DONGLE (WH1080 / PCE-FWS20 protocol)<br><small><small>(reboot after saving to apply changes)</small></small></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style41" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Band Frequency MHz</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <select id="rtlsdr_frequency" type="text" name="rtlsdr_frequency" style="width: 100%" >
                         <option value=433 <?php if (trim('433') == trim($rtlsdr_frequency_data)) echo 'selected'; ?>>433</option>
                         <option value=868 <?php if (trim('868') == trim($rtlsdr_frequency_data)) echo 'selected'; ?>>868</option>
                         <option value=915 <?php if (trim('915') == trim($rtlsdr_frequency_data)) echo 'selected'; ?>>915</option>                                                      
                    </select></td>
            </tr>           
            <tr>
                <td style="padding:5px" class="style41" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Bit Detection Level</font></td>
                    <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <select id="rtlsdr_bdl" type="text" name="rtlsdr_bdl" style="width: 100%" >
                        <option value=0 <?php if (trim('0') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>Auto</option>
                        <option value=4000 <?php if (trim('4000') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>4000</option>
                        <option value=8000 <?php if (trim('8000') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>8000</option>
                        <option value=12000 <?php if (trim('12000') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>12000</option>                        
                        <option value=16000 <?php if (trim('16000') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>16000</option>
                        <option value=24000 <?php if (trim('24000') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>24000</option>                        
                        <option value=32000 <?php if (trim('32000') == trim($rtlsdr_bdl_data)) echo 'selected'; ?>>32000</option>                            
                    </select></td>
            </tr>
			<tr>
                <td style="padding:5px" class="style41" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Tuner frequency offset<br>error correction (default: 0)</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">                   
                    <input id="rtlsdr_ppm" type="text" name="rtlsdr_ppm" value=<?php echo $rtlsdr_ppm_data; ?> style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style41" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Synchronize system datetime with received DCF77 timesignal</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <select id="rtlsdr_timesync" type="text" name="rtlsdr_timesync" style="width: 100%" >
							<option value=True <?php if (trim('True') == trim($rtlsdr_timesync_data)) echo 'selected'; ?>>True</option>
							<option value=False <?php if (trim('False') == trim($rtlsdr_timesync_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
			
            </table>
    <br />
	</div>

    <!-- SECURITY -->

    <div class="tabContent" id="Security"> 			
        <table cellpadding="10" bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">
                    <font color=#000000>Security</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Password web-config</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <input id="web_pwd" type="password" name="web_pwd" value=<?php echo $web_pwd_data; ?>  style="width: 100%" /></td>
            </tr>
            </table>
    <br />
	</div>
    
    <!-- DATALOGGING -->

	<div class="tabContent" id="DataLogging">		
        <table  bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">
                    <font color=#000000>DataLogging</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" width="60%px" bgcolor="#d3d3d3">
                    <font color=#000000>Log all meteo data to internal Database <br> If 'False' the internal database will only be used to calculate the current statistics (last 2 days)</font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="logdata" type="text" name="logdata_internal" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($logdata_internal_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($logdata_internal_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Log all meteo data to a PHP web server </font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="logdata" type="text" name="logdata_external" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($logdata_external_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($logdata_external_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Http address of the PHP web server file</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="serverfile" type="text" name="serverfile" value=<?php echo $serverfile_data; ?> style="width: 100%" /></td>
            </tr>
            </table>
    <br /> 
	</div>
    
    <!-- WEATHER -->

	<div class="tabContent" id="Weather"> 			   
        <table cellpadding="10" bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">Weather Underground</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Log data to Weather Underground PWS </font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="WeatherUnderground_logdata" type="text" name="WeatherUnderground_logdata" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($weatherunderground_logdata_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($weatherunderground_logdata_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Weather Underground station ID </font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="WeatherUnderground_ID" type="text" name="WeatherUnderground_ID" value=<?php echo $weatherunderground_id_data; ?> style="width: 100%" /></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Weather Underground password </font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="WeatherUnderground_password" type="text" name="WeatherUnderground_password" value=<?php echo $weatherunderground_password_data; ?> style="width: 100%" /></td>
            </tr>
            </table>            
    <br />
	   
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color:#000000;">Citizen Weather Observer Program</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Log data to CWOP </font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="CWOP_logdata" type="text" name="CWOP_logdata" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($cwop_logdata_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($cwop_logdata_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>CWOP&nbsp; station ID </font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="CWOP_ID" type="text" name="CWOP_ID" value=<?php echo $cwop_id_data; ?> style="width: 100%" /></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>CWOP&nbsp; password</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="CWOP_password" type="text" name="CWOP_password" value=<?php echo $cwop_password_data; ?> style="width: 100%" /></td>
            </tr>
        </table>
            
         <br />   
            
            <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color:#000000;">Wind Finder</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Log data to Wind Finder</font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="WindFinder_logdata" type="text" name="WindFinder_logdata" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($windfinder_logdata_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($windfinder_logdata_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Wind Finder&nbsp; station ID</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="WindFinder_ID" type="text" name="WindFinder_ID" value=<?php echo $windfinder_id_data; ?> style="width: 100%" /></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Wind Finder&nbsp; password (WindFinder_password)</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="WindFinder_password" type="text" name="WindFinder_password" value=<?php echo $windfinder_password_data; ?> style="width: 100%" /></td>
            </tr>
            </table>
            
            
    <br />
	
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">PWS - Personal Weather Station</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Log data to PWS</font></td>
                <td style="padding:5px" class="style20" height="30px" bgcolor="#d3d3d3">
                    <select id="PWS_logdata" type="text" name="PWS_logdata" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($pws_logdata_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($pws_logdata_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>PWS&nbsp; station ID</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="PWS_ID" type="text" name="PWS_ID" value=<?php echo $pws_id_data; ?> style="width: 100%" /></td>
            </tr>
            <tr> 
                <td style="padding:5px" class="style8" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>PWS&nbsp; password</font></td>
                <td style="padding:5px" class="style19" height="30px" bgcolor="#d3d3d3">
                    <input id="PWS_password" type="text" name="PWS_password" value=<?php echo $pws_password_data; ?> style="width: 100%" /></td>
            </tr>
            </table>
    <br />
	</div>
    
    <!-- UPLOAD-FTP -->

	<div class="tabContent" id="Upload"> 	           
            
        <table bgcolor=$LayColorTBC border="1" frame="box" style="width: 100%; margin-right: 0px">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">Upload</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style47" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Upload all meteo data to a FTP server a json file. Will use credential of the FTP section.</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <select id="upload_data" type="text" name="upload_data" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($upload_data_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($upload_data_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style48" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>FTP folder to upload</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <input id="upload_folder" type="text" name="upload_folder" value=<?php echo $upload_folder_data; ?>  style="width: 100%" /></td>
            </tr>
        </table>
    <br />
		
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">FTP</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>FTP Server</td>
                <td style="padding:5px" class="style38" height="30px" bgcolor="#d3d3d3">
                    <input id="ftpserver" type="text" name="ftpserver" value="<?php echo $ftpserver_data; ?>"  style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style3" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Destination folder</font></td>
                <td style="padding:5px" class="style36" height="30px" bgcolor="#d3d3d3">
                    <input id="ftpserverDestFolder" type="text" name="ftpserverDestFolder" value="<?php echo $ftpserverdestfolder_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style3" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Login</font></td>
                <td style="padding:5px" class="style36" height="30px" bgcolor="#d3d3d3">
                    <input id="ftpserverLogin" type="text" name="ftpserverLogin" value="<?php echo $ftpserverlogin_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style5" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Password</font></td>
                <td style="padding:5px" class="style37" height="30px" bgcolor="#d3d3d3">
                    <input id="ftpserverPassowd" type="password" name="ftpserverPassowd" value="<?php echo $ftpserverpassowd_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style5" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use a thread for sending</font></td>
                <td style="padding:5px" class="style37" height="30px" bgcolor="#d3d3d3">
                    <select id="use_thread_for_sending_to_server" type="text" name="use_thread_for_sending_to_server" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_thread_for_sending_to_server_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_thread_for_sending_to_server_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
        </table>
	<br />
	</div>

    <!-- MAIL -->

	<div class="tabContent" id="Mail"> 
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">Mail</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style5" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Use mail to comunicate</font></td>
                <td style="padding:5px" class="style17"height="30px" bgcolor="#d3d3d3">
                    <select id="use_mail" type="text" name="use_mail" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_mail_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_mail_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>User</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <input id="gmail_user" type="text" name="gmail_user" value="<?php echo $gmail_user_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style3" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Password</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <input id="gmail_pwd" type="password" name="gmail_pwd" value="<?php echo $gmail_pwd_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style3" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Address to send to</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <input id="mail_to" type="text" name="mail_to" value="<?php echo $mail_to_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style5" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Mail IP at statup</font></td>
                <td style="padding:5px" class="style17"height="30px" bgcolor="#d3d3d3">
                    <select id="mail_ip" type="text" name="mail_ip" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($mail_ip_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($mail_ip_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            </table>
	<br />
        
	</div>
    
    <!-- DYNDNS -->

	<div class="tabContent" id="DynDNS">             
        <br >
        <table bgcolor=$LayColorTBC border="1" frame="box" width="100%">
            <tr>
                <td style="padding:5px" class="style7" colspan="2" style="font-size: large; color: #000000;">DNS Exit(DynDNS) - https://www.dnsexit.com/</td>
            </tr>
            <tr>
                <td style="padding:5px" class="style5" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Send ip information to DNS Exit</font></td>
                <td style="padding:5px" class="style17" height="30px" bgcolor="#d3d3d3">
                    <select id="use_DNSExit" type="text" name="use_DNSExit" style="width: 100%" >
                        <option value=True <?php if (trim('True') == trim($use_dnsexit_data)) echo 'selected'; ?>>True</option>
                        <option value=False <?php if (trim('False') == trim($use_dnsexit_data)) echo 'selected'; ?>>False</option>
                    </select></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style2" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>User</font></td>
                <td style="padding:5px" class="style17"height="30px" bgcolor="#d3d3d3">
                    <input id="DNSExit_uname" type="text" name="DNSExit_uname" value="<?php echo $dnsexit_uname_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style3" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Password </font></td>
                <td style="padding:5px" class="style17"height="30px" bgcolor="#d3d3d3">
                    <input id="DNSExit_pwd" type="password" name="DNSExit_pwd" value="<?php echo $dnsexit_pwd_data; ?>" style="width: 100%" /></td>
            </tr>
            <tr>
                <td style="padding:5px" class="style5" height="30px" bgcolor="#d3d3d3">
                    <font color=#000000>Hostname </font></td>
                <td style="padding:5px" class="style17"height="30px" bgcolor="#d3d3d3">
                    <input id="DNSExit_hname" type="text" name="DNSExit_hname" value="<?php echo $dnsexit_hname_data; ?>" style="width: 100%" /></td>
            </tr>
            </table>
			
			</div>
			<br>
       <p>
            <input id="Submit1" type="submit" value="Save" /></p>
            </form>   
 	
</div>

<div id="dialog-placeholder"></div>
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

</body>
</html>
