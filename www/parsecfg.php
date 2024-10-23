<?php
   //session_start();
	$file_cfg = ("/home/pi/meteopi/meteopi.cfg");
   	$lines = file($file_cfg);

	//[General]
	$station_name = 'station_name'; $station_name_data = '';
	$set_sistem_time_from_ntp_server_at_startup = 'set_sistem_time_from_ntp_server_at_startup'; $set_sistem_time_from_ntp_server_at_startup_data = '';
	$ntp_server = 'ntp_server'; $ntp_server_data = '';
	$reboot_at = 'reboot_at'; $reboot_at_data = '';
	$shutdown_at = 'shutdown_at'; $shutdown_at_data = '';
	$shutdown_hour_before_sunset = 'shutdown_hour_before_sunset'; $shutdown_hour_before_sunset_data = '';
	$location_latitude = 'location_latitude'; $location_latitude_data = '';
	$location_longitude = 'location_longitude'; $location_longitude_data = '';
	$location_altitude = 'location_altitude'; $location_altitude_data = '';
	$wifi_reset_if_down = 'wifi_reset_if_down'; $wifi_reset_if_down_data = '';
	$cloudbase_calib = 'cloudbase_calib'; $cloudbase_calib_data = '';
	$set_time_at_boot = 'set_time_at_boot'; $set_time_at_boot_data = '';
	$wind_speed_units = 'wind_speed_units'; $wind_speed_units_data = '';
	$ntp_url = 'ntp_url'; $ntp_url_data = '';

	//[Security]
	$web_pwd = 'web_pwd'; $webpwd_data = '';

	//[DataLogging]
	$logdata_internal = 'logdata_internal'; $logdata_internal_data = '';
	$logdata_external = 'logdata_external'; $logdata_external_data = '';
	$serverfile = 'serverfile'; $serverfile_data = '';

	//[Upload]
	$upload_data = 'upload_data'; $upload_data_data = '';
	$upload_folder = 'upload_folder'; $upload_folder_data = '';

	//[Sensors]
	$sensor_type = 'sensor_type'; $sensor_type_data = '';
	$davis_error = 'davis_error'; $davis_error_data = '';
	$use_wind_sensor = 'use_wind_sensor'; $use_wind_sensor_data = '';
	$number_of_measure_for_wind_dir_average = 'number_of_measure_for_wind_dir_average'; $number_of_measure_for_wind_dir_average_data = '';
	$windspeed_offset = 'windspeed_offset'; $windspeed_offset_data = '';
	$windspeed_gain = 'windspeed_gain'; $windspeed_gain_data = '';
	$windmeasureinterval = 'windmeasureinterval'; $windmeasureinterval_data = '';
	$use_bmp085 = 'use_bmp085'; $use_bmp085_data = '';
	$use_tsl2591 = 'use_tsl2591'; $use_tsl2591_data = '';
	$use_sds011 = 'use_sds011'; $use_sds011_data = '';
	$use_bme280 = 'use_bme280'; $use_bme280_data = '';
	$use_tmp36 = 'use_tmp36'; $use_tmp36_data = '';
	$use_dht = 'use_dht'; $use_dht_data = '';
	$dht_type = 'dht_type'; $dht_type_data = '';
	$number_of_measure_for_wind_trend = 'number_of_measure_for_wind_trend'; $number_of_measure_for_wind_trend_data = '';
	$wind_trend_limit = 'wind_trend_limit'; $wind_trend_limit_data = '';
	$number_of_measure_for_wind_average_gust_calculation = 'number_of_measure_for_wind_average_gust_calculation'; $number_of_measure_for_wind_average_gust_calculation_data = '';
	$sensor_temp_out = 'sensor_temp_out'; $sensor_temp_out_data = '';
	$sensor_temp_in = 'sensor_temp_in'; $sensor_temp_in_data = '';
	$solarsensor = 'solarsensor'; $solarsensor_data = '';
	$uvsensor = 'uvsensor'; $uvsensor_data = '';

	//[Sensor_PCE-FWS20]
	$set_system_time_from_weatherstation = 'set_system_time_from_weatherstation'; $set_system_time_from_weatherstation_data = '';

	//[Sensor_serial]
	$sensor_serial_port = 'sensor_serial_port'; $sensor_serial_port_data = '';

	//[RTL-SDR]
	$rtlsdr_frequency = 'rtlsdr_frequency'; $rtlsdr_frequency_data = '';
	$rtlsdr_bdl = 'rtlsdr_bdl'; $rtlsdr_bdl_data = '';
	$rtlsdr_ppm = 'rtlsdr_ppm'; $rtlsdr_ppm_data = '';
	$rtlsdr_timesync = 'rtlsdr_timesync'; $rtlsdr_timesync_data = '';

	//[WebCam]
	$webcamdevice1 = 'webcamdevice1'; $webcamdevice1_data = '';
	$webcamdevice2 = 'webcamdevice2'; $webcamdevice2_data = '';
	$webcamlogo = 'webcamlogo'; $webcamlogo_data = '';
	$sendimagestoserver = 'sendimagestoserver'; $sendimagestoserver_data = '';
	$webcaminterval = 'webcaminterval'; $webcaminterval_data = '';
	$webcamdevice1captureresolution = 'webcamdevice1captureresolution'; $webcamdevice1captureresolution_data = '';
	$webcamdevice2captureresolution = 'webcamdevice2captureresolution'; $webcamdevice2captureresolution_data = '';
	$webcamdevice1finalresolution = 'webcamdevice1finalresolution'; $webcamdevice1finalresolution_data = '';
	$webcamdevice2finalresolution = 'webcamdevice2finalresolution'; $webcamdevice2finalresolution_data = '';
	$captureprogram = 'captureprogram'; $captureprogram_data = '';
	$sendallimagestoserver = 'sendallimagestoserver'; $sendallimagestoserver_data = '';
	$delete_images_on_sd = 'delete_images_on_sd'; $delete_images_on_sd_data = '';

	//[Camera]
	$usecameradivice = 'usecameradivice'; $usecameradivice_data = '';
	$cameradivicefinalresolution = 'cameradivicefinalresolution'; $cameradivicefinalresolution_data = '';
	$gphoto2options = 'gphoto2options'; $gphoto2options_data = '';
	$gphoto2options_night = 'gphoto2options_night'; $gphoto2options_night_data = '';
	$reset_usb = 'reset_usb'; $reset_usb_data = '';
	$clear_all_sd_cards_at_startup = 'clear_all_sd_cards_at_startup'; $clear_all_sd_cards_at_startup_data = '';
	$start_camera_number = 'start_camera_number'; $start_camera_number_data = '';
	$gphoto2_capture_image_and_download = 'gphoto2_capture_image_and_download'; $gphoto2_capture_image_and_download_data = '';
	$use_camera_resetter = 'use_camera_resetter'; $use_camera_resetter_data = '';
	$camera_resetter_normaly_on = 'camera_resetter_normaly_on'; $camera_resetter_normaly_on_data = '';
	$on_off_camera = 'on_off_camera'; $on_off_camera_data = '';

	//[CameraPI]
	$use_camerapi = 'use_camerapi'; $use_camerapi_data = '';
	$camerapi_day_settings = 'camerapi_day_settings'; $camerapi_day_settings_data = '';
	$camerapi_night_settings = 'camerapi_night_settings'; $camerapi_night_settings_data = '';
	$camerapi_timelapse = 'camerapi_timelapse'; $camerapi_timelapse_data = '';
	$camerapi_timelapse_settings = 'camerapi_timelapse_settings'; $camerapi_timelapse_settings_data = '';

	//[IPCam]
	$ipcaminterval = 'ipcaminterval'; $ipcaminterval_data = '';
	$ipcamcfg = 'ipcamcfg'; $ipcamcfg_data = '';
	$ipcamip1 = 'ipcamip1'; $ipcamip1_data = '';
	$ipcamus1 = 'ipcamus1'; $ipcamus1_data = '';
	$ipcampw1 = 'ipcampw1'; $ipcampw1_data = '';
	$ipcamsn1 = 'ipcamsn1'; $ipcamsn1_data = '';
	$ipcamip2 = 'ipcamip2'; $ipcamip2_data = '';
	$ipcamus2 = 'ipcamus2'; $ipcamus2_data = '';
	$ipcampw2 = 'ipcampw2'; $ipcampw2_data = '';
	$ipcamsn2 = 'ipcamsn2'; $ipcamsn2_data = '';
	$ipcamzzz = 'ipcamzzz'; $ipcamzzz_data = '';
	$ipcamposn = 'ipcamposn'; $ipcamposn_data = '';
	$ipcamposne = 'ipcamposne'; $ipcamposne_data = '';
	$ipcampose = 'ipcampose'; $ipcampose_data = '';
	$ipcamposse = 'ipcamposse'; $ipcamposse_data = '';
	$ipcamposs = 'ipcamposs'; $ipcamposs_data = '';
	$ipcampossw = 'ipcampossw'; $ipcampossw_data = '';
	$ipcamposw = 'ipcamposw'; $ipcamposw_data = '';
	$ipcamposnw = 'ipcamposnw'; $ipcamposnw_data = '';

	//[ftp]
	$ftpserver = 'ftpserver'; $ftpserver_data = '';
	$ftpserverdestfolder = 'ftpserverdestfolder'; $ftpserverdestfolder_data = '';
	$ftpserverlogin = 'ftpserverlogin'; $ftpserverlogin_data = '';
	$ftpserverpassowd = 'ftpserverpassowd'; $ftpserverpassowd_data = '';
	$use_thread_for_sending_to_server = 'use_thread_for_sending_to_server'; $use_thread_for_sending_to_server_data = '';

	//[WeatherUnderground]
	$weatherunderground_logdata = 'weatherunderground_logdata'; $weatherunderground_logdata_data = '';
	$weatherunderground_id = 'weatherunderground_id'; $weatherunderground_id_data = '';
	$weatherunderground_password = 'weatherunderground_password'; $weatherunderground_password_data = '';

	//[PWS]
	$pws_logdata = 'pws_logdata'; $pws_logdata_data = '';
	$pws_id = 'pws_id'; $pws_id_data = '';
	$pws_password = 'pws_password'; $pws_password_data = '';

	//[CWOP]
	$cwop_logdata = 'cwop_logdata'; $cwop_logdata_data = '';
	$cwop_id = 'cwop_id'; $cwop_id_data = '';
	$cwop_password = 'cwop_password'; $cwop_password_data = '';

	//[WindFinder]
	$windfinder_logdata = 'windfinder_logdata'; $windfinder_logdata_data = '';
	$windfinder_id = 'windfinder_id'; $windfinder_id_data = '';
	$windfinder_password = 'windfinder_password'; $windfinder_password_data = '';

	//[Mail]
	$gmail_user = 'gmail_user'; $gmail_user_data = '';
	$gmail_pwd = 'gmail_pwd'; $gmail_pwd_data = '';
	$mail_to = 'mail_to'; $mail_to_data = '';
	$use_mail = 'use_mail'; $use_mail_data = '';
	$mail_ip = 'mail_ip'; $mail_ip_data = '';

	//[DNSExit]
	$use_dnsexit = 'use_dnsexit'; $use_dnsexit_data = '';
	$dnsexit_uname = 'dnsexit_uname'; $dnsexit_uname_data = '';
	$dnsexit_pwd = 'dnsexit_pwd'; $dnsexit_pwd_data = '';
	$dnsexit_hname = 'dnsexit_hname'; $dnsexit_hname_data = '';
?>
