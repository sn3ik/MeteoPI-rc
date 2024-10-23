<?php

	include ('readcfg.php');
	
		unlink($file_cfg);
		$myfile = fopen($file_cfg, "w") or die("Unable to open file!");
  
		fwrite($myfile, "[General]\n");
		fwrite($myfile,$station_name." = ".trim($_POST["station_name"])."\n");
		fwrite($myfile,$reboot_at." = ".trim($_POST["reboot_at"])."\n");
		fwrite($myfile,$shutdown_at." = ".trim($_POST["shutdown_at"])."\n");
		fwrite($myfile,$shutdown_hour_before_sunset." = ".trim($_POST["shutdown_hour_before_sunset"])."\n");
		fwrite($myfile,$location_latitude." = ".trim($_POST["location_latitude"])."\n");
		fwrite($myfile,$location_longitude." = ".trim($_POST["location_longitude"])."\n");
		fwrite($myfile,$location_altitude." = ".trim($_POST["location_altitude"])."\n");
		fwrite($myfile,$wifi_reset_if_down." = ".trim($_POST["wifi_reset_if_down"])."\n");
		fwrite($myfile,$cloudbase_calib." = 1.0 \n");
		fwrite($myfile,$set_time_at_boot." = ".trim($_POST["set_time_at_boot"])."\n");
		fwrite($myfile,$wind_speed_units." = ".trim($_POST["wind_speed_units"])."\n");
		fwrite($myfile,$ntp_url." = ".trim($_POST["ntp_url"])."\n");
		fwrite($myfile,$set_sistem_time_from_ntp_server_at_startup." = ".trim($_POST["set_system_time_from_ntp_server_at_startup"])."\n");
		fwrite($myfile,$ntp_server." = ".trim($_POST["ntp_server"])."\n");

		fwrite($myfile, "\n[Security]\n");
		fwrite($myfile,$web_pwd." = ".trim($_POST["web_pwd"])."\n");
		
		fwrite($myfile, "\n[DataLogging]\n");
		fwrite($myfile,$logdata_internal." = ".trim($_POST["logdata_internal"])."\n");
		fwrite($myfile,$logdata_external." = ".trim($_POST["logdata_external"])."\n");
		fwrite($myfile,$serverfile." = ".trim($_POST["serverfile"])."\n");
		
		fwrite($myfile, "\n[Upload]\n");
		fwrite($myfile,$upload_data." = ".trim($_POST["upload_data"])."\n");
		fwrite($myfile,$upload_folder." = ".trim($_POST["upload_folder"])."\n");
		
		fwrite($myfile, "\n[Sensors]\n");
		fwrite($myfile,$sensor_type." = ".trim($_POST["sensor_type"])."\n");
		fwrite($myfile,$use_wind_sensor." = ".trim($_POST["use_wind_sensor"])."\n");
		fwrite($myfile,$number_of_measure_for_wind_dir_average." = ".trim($_POST["number_of_measure_for_wind_dir_average"])."\n");
		fwrite($myfile,$windspeed_offset." = ".trim($_POST["windspeed_offset"])."\n");
		fwrite($myfile,$windspeed_gain." = ".trim($_POST["windspeed_gain"])."\n");
		fwrite($myfile,$windmeasureinterval." = ".trim($_POST["windmeasureinterval"])."\n");
		fwrite($myfile,$use_bmp085." = ".trim($_POST["use_bmp085"])."\n");
		fwrite($myfile,$use_tsl2591." = ".trim($_POST["use_tsl2591"])."\n");
		fwrite($myfile,$use_sds011." = ".trim($_POST["use_sds011"])."\n");
		fwrite($myfile,$use_bme280." = ".trim($_POST["use_bme280"])."\n");
		fwrite($myfile,$use_tmp36." = ".trim($_POST["use_tmp36"])."\n");
		fwrite($myfile,$use_dht." = ".trim($_POST["use_dht"])."\n");
		fwrite($myfile,$dht_type." = ".trim($_POST["dht_type"])."\n");
		fwrite($myfile,$number_of_measure_for_wind_trend." = ".trim($_POST["number_of_measure_for_wind_trend"])."\n");
		fwrite($myfile,$wind_trend_limit." = ".trim($_POST["wind_trend_limit"])."\n");
		fwrite($myfile,$number_of_measure_for_wind_average_gust_calculation." = ".trim($_POST["number_of_measure_for_wind_average_gust_calculation"])."\n");
		fwrite($myfile,$sensor_temp_in." = Default \n");
		fwrite($myfile,$sensor_temp_out." = Default \n");
		fwrite($myfile,$solarsensor." = ".trim($_POST["solarsensor"])."\n");
		fwrite($myfile,$uvsensor." = ".trim($_POST["uvsensor"])."\n");
		
		fwrite($myfile, "\n[Sensor_PCE-FWS20]\n");
		fwrite($myfile,$set_system_time_from_weatherstation." = ".trim($_POST["set_system_time_from_WeatherStation"])."\n");
		
		fwrite($myfile, "\n[Sensor_serial]\n");
		fwrite($myfile,$sensor_serial_port." = ".trim($_POST["sensor_serial_port"])."\n");
		
		fwrite($myfile, "\n[RTL-SDR]\n");
		fwrite($myfile,$rtlsdr_frequency." = ".trim($_POST["rtlsdr_frequency"])."\n");
		fwrite($myfile,$rtlsdr_bdl." = ".trim($_POST["rtlsdr_bdl"])."\n");
		fwrite($myfile,$rtlsdr_ppm." = ".trim($_POST["rtlsdr_ppm"])."\n");
		fwrite($myfile,$rtlsdr_timesync." = ".trim($_POST["rtlsdr_timesync"])."\n");
		
		fwrite($myfile, "\n[WebCam]\n");
		fwrite($myfile,$webcamdevice1." = ".trim($_POST["webcamDevice1"])."\n");
		fwrite($myfile,$webcamdevice2." = ".trim($_POST["webcamDevice2"])."\n");
		fwrite($myfile,$webcamlogo." = ".trim($_POST["webcamLogo"])."\n");
		fwrite($myfile,$sendimagestoserver." = ".trim($_POST["sendImagesToServer"])."\n");
		fwrite($myfile,$webcaminterval." = ".trim($_POST["WebCamInterval"])."\n");
		fwrite($myfile,$webcamdevice1captureresolution." = ".trim($_POST["webcamdevice1captureresolution"])."\n");
		fwrite($myfile,$webcamdevice2captureresolution." = ".trim($_POST["webcamdevice2captureresolution"])."\n");
		fwrite($myfile,$webcamdevice1finalresolution." = ".trim($_POST["webcamdevice1finalresolution"])."\n");
		fwrite($myfile,$webcamdevice2finalresolution." = ".trim($_POST["webcamdevice2finalresolution"])."\n");
		fwrite($myfile,$captureprogram." = ".trim($_POST["captureprogram"])."\n");
		fwrite($myfile,$sendallimagestoserver." = ".trim($_POST["sendallimagestoserver"])."\n");
		fwrite($myfile,$delete_images_on_sd." = ".trim($_POST["delete_images_on_sd"])."\n");
		
		fwrite($myfile, "\n[Camera]\n");
		fwrite($myfile,$usecameradivice." = ".trim($_POST["usecameradivice"])."\n");
		fwrite($myfile,$cameradivicefinalresolution." = ".trim($_POST["cameradivicefinalresolution"])."\n");
		fwrite($myfile,$gphoto2options." = ".trim($_POST["gphoto2options"])."\n");
		fwrite($myfile,$gphoto2options_night." = ".trim($_POST["gphoto2options_Night"])."\n");
		fwrite($myfile,$reset_usb." = ".trim($_POST["reset_usb"])."\n");
		fwrite($myfile,$clear_all_sd_cards_at_startup." = ".trim($_POST["clear_all_sd_cards_at_startup"])."\n");
		fwrite($myfile,$start_camera_number." = ".trim($_POST["start_camera_number"])."\n");
		fwrite($myfile,$gphoto2_capture_image_and_download." = ".trim($_POST["gphoto2_capture_image_and_download"])."\n");
		fwrite($myfile,$use_camera_resetter." = ".trim($_POST["use_camera_resetter"])."\n");
		fwrite($myfile,$camera_resetter_normaly_on." = ".trim($_POST["camera_resetter_normaly_on"])."\n");
		fwrite($myfile,$on_off_camera." = ".trim($_POST["on_off_camera"])."\n");
		
		fwrite($myfile, "\n[CameraPI]\n");
		fwrite($myfile,$use_camerapi." = ".trim($_POST["use_cameraPI"])."\n");
		fwrite($myfile,$camerapi_day_settings." = ".trim($_POST["cameraPI_day_settings"])."\n");
		fwrite($myfile,$camerapi_night_settings." = ".trim($_POST["cameraPI_night_settings"])."\n");
		fwrite($myfile,$camerapi_timelapse." = ".trim($_POST["cameraPI_timelapse"])."\n");
		fwrite($myfile,$camerapi_timelapse_settings." = ".trim($_POST["cameraPI_timelapse_settings"])."\n");
		
		fwrite($myfile, "\n[IPCam]\n");
		fwrite($myfile,$ipcaminterval." = ".trim($_POST["IPCamInterval"])."\n");
		fwrite($myfile,$ipcamcfg." = ".trim($_POST["IPCamCfg"])."\n");
		fwrite($myfile,$ipcamip1." = ".trim($_POST["IPCamIP1"])."\n");
		fwrite($myfile,$ipcamus1." = ".trim($_POST["IPCamUS1"])."\n");
		fwrite($myfile,$ipcampw1." = ".trim($_POST["IPCamPW1"])."\n");
		fwrite($myfile,$ipcamsn1." = ".trim($_POST["IPCamSN1"])."\n");
		fwrite($myfile,$ipcamip2." = ".trim($_POST["IPCamIP2"])."\n");
		fwrite($myfile,$ipcamus2." = ".trim($_POST["IPCamUS2"])."\n");
		fwrite($myfile,$ipcampw2." = ".trim($_POST["IPCamPW2"])."\n");
		fwrite($myfile,$ipcamsn2." = ".trim($_POST["IPCamSN2"])."\n");
		fwrite($myfile,$ipcamzzz." = ".trim($_POST["IPCamZZZ"])."\n");
		fwrite($myfile,$ipcamposn." = ".trim($_POST["IPCamPosN"])."\n");
		fwrite($myfile,$ipcamposne." = ".trim($_POST["IPCamPosNE"])."\n");
		fwrite($myfile,$ipcampose." = ".trim($_POST["IPCamPosE"])."\n");
		fwrite($myfile,$ipcamposse." = ".trim($_POST["IPCamPosSE"])."\n");
		fwrite($myfile,$ipcamposs." = ".trim($_POST["IPCamPosS"])."\n");
		fwrite($myfile,$ipcampossw." = ".trim($_POST["IPCamPosSW"])."\n");
		fwrite($myfile,$ipcamposw." = ".trim($_POST["IPCamPosW"])."\n");
		fwrite($myfile,$ipcamposnw." = ".trim($_POST["IPCamPosNW"])."\n");
		
		fwrite($myfile, "\n[ftp]\n");
		fwrite($myfile,$ftpserver." = ".trim($_POST["ftpserver"])."\n");
		fwrite($myfile,$ftpserverdestfolder." = ".trim($_POST["ftpserverDestFolder"])."\n");
		fwrite($myfile,$ftpserverlogin." = ".trim($_POST["ftpserverLogin"])."\n");
		fwrite($myfile,$ftpserverpassowd." = ".trim($_POST["ftpserverPassowd"])."\n");
		fwrite($myfile,$use_thread_for_sending_to_server." = ".trim($_POST["use_thread_for_sending_to_server"])."\n");
		
		fwrite($myfile, "\n[WeatherUnderground]\n");
		fwrite($myfile,$weatherunderground_logdata." = ".trim($_POST["WeatherUnderground_logdata"])."\n");
		fwrite($myfile,$weatherunderground_id." = ".trim($_POST["WeatherUnderground_ID"])."\n");
		fwrite($myfile,$weatherunderground_password." = ".trim($_POST["WeatherUnderground_password"])."\n");
		
		fwrite($myfile, "\n[PWS]\n");
		fwrite($myfile,$pws_logdata." = ".trim($_POST["PWS_logdata"])."\n");
		fwrite($myfile,$pws_id." = ".trim($_POST["PWS_ID"])."\n");
		fwrite($myfile,$pws_password." = ".trim($_POST["PWS_password"])."\n");
		
		fwrite($myfile, "\n[CWOP]\n");
		fwrite($myfile,$cwop_logdata." = ".trim($_POST["CWOP_logdata"])."\n");
		fwrite($myfile,$cwop_id." = ".trim($_POST["CWOP_ID"])."\n");
		fwrite($myfile,$cwop_password." = ".trim($_POST["CWOP_password"])."\n");
		
		fwrite($myfile, "\n[WindFinder]\n");
		fwrite($myfile,$windfinder_logdata." = ".trim($_POST["WindFinder_logdata"])."\n");
		fwrite($myfile,$windfinder_id." = ".trim($_POST["WindFinder_ID"])."\n");
		fwrite($myfile,$windfinder_password." = ".trim($_POST["WindFinder_password"])."\n");
		
		fwrite($myfile, "\n[Mail]\n");
		fwrite($myfile,$use_mail." = ".trim($_POST["use_mail"])."\n");
		fwrite($myfile,$gmail_user." = ".trim($_POST["gmail_user"])."\n");
		fwrite($myfile,$gmail_pwd." = ".trim($_POST["gmail_pwd"])."\n");
		fwrite($myfile,$mail_to." = ".trim($_POST["mail_to"])."\n");
		fwrite($myfile,$mail_ip." = ".trim($_POST["mail_ip"])."\n");
		
		fwrite($myfile, "\n[DNSExit]\n");
		fwrite($myfile,$use_dnsexit." = ".trim($_POST["use_DNSExit"])."\n");
		fwrite($myfile,$dnsexit_uname." = ".trim($_POST["DNSExit_uname"])."\n");
		fwrite($myfile,$dnsexit_pwd." = ".trim($_POST["DNSExit_pwd"])."\n");
		fwrite($myfile,$dnsexit_hname." = ".trim($_POST["DNSExit_hname"])."\n");

		fclose($myfile);
		
		//echo $int." - ".count($replace)." - ".count($_POST));

	header("Location: meteopi.php")

?>


