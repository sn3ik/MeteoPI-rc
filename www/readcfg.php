<?php
   //session_start();

   include ('parsecfg.php');

   foreach($lines as $line)
   {
      // Check if the line contains the string we're looking for, and print if it does
      $liner=explode("=",$line);
      if(trim($liner[0]) == $station_name) $station_name_data = $liner[1];
      if(trim($liner[0]) == $set_sistem_time_from_ntp_server_at_startup) $set_sistem_time_from_ntp_server_at_startup_data = $liner[1];
      if(trim($liner[0]) == $ntp_server) $ntp_server_data = $liner[1];
      if(trim($liner[0]) == $reboot_at) $reboot_at_data = $liner[1];
      if(trim($liner[0]) == $shutdown_at) $shutdown_at_data = $liner[1];
      if(trim($liner[0]) == $shutdown_hour_before_sunset) $shutdown_hour_before_sunset_data = $liner[1];
      if(trim($liner[0]) == $location_latitude) $location_latitude_data = $liner[1];
      if(trim($liner[0]) == $location_longitude) $location_longitude_data = $liner[1];
      if(trim($liner[0]) == $location_altitude) $location_altitude_data = $liner[1];
      if(trim($liner[0]) == $wifi_reset_if_down) $wifi_reset_if_down_data = $liner[1];
      if(trim($liner[0]) == $cloudbase_calib) $cloudbase_calib_data = $liner[1];
      if(trim($liner[0]) == $set_time_at_boot) $set_time_at_boot_data = $liner[1];
      if(trim($liner[0]) == $wind_speed_units) $wind_speed_units_data = $liner[1];
      if(trim($liner[0]) == $ntp_url) $ntp_url_data = $liner[1];
      if(trim($liner[0]) == $web_pwd) $web_pwd_data = $liner[1];
      if(trim($liner[0]) == $logdata_internal) $logdata_internal_data = $liner[1];
      if(trim($liner[0]) == $logdata_external) $logdata_external_data = $liner[1];
      if(trim($liner[0]) == $serverfile) $serverfile_data = $liner[1];
      if(trim($liner[0]) == $upload_data) $upload_data_data = $liner[1];
      if(trim($liner[0]) == $upload_folder) $upload_folder_data = $liner[1];
      
      if(trim($liner[0]) == $sensor_type) $sensor_type_data = $liner[1];
      if(trim($liner[0]) == $davis_error) $davis_error_data = $liner[1];
      if(trim($liner[0]) == $use_wind_sensor) $use_wind_sensor_data = $liner[1];
      if(trim($liner[0]) == $number_of_measure_for_wind_dir_average) $number_of_measure_for_wind_dir_average_data = $liner[1];
      if(trim($liner[0]) == $windspeed_offset) $windspeed_offset_data = $liner[1];
      if(trim($liner[0]) == $windspeed_gain) $windspeed_gain_data = $liner[1];
      if(trim($liner[0]) == $windmeasureinterval) $windmeasureinterval_data = $liner[1];
      if(trim($liner[0]) == $use_bmp085) $use_bmp085_data = $liner[1];
      if(trim($liner[0]) == $use_tsl2591) $use_tsl2591_data = $liner[1];
      if(trim($liner[0]) == $use_sds011) $use_sds011_data = $liner[1];
      if(trim($liner[0]) == $use_bme280) $use_bme280_data = $liner[1];
      if(trim($liner[0]) == $use_tmp36) $use_tmp36_data = $liner[1];
      if(trim($liner[0]) == $use_dht) $use_dht_data = $liner[1];
      if(trim($liner[0]) == $dht_type) $dht_type_data = $liner[1];
      if(trim($liner[0]) == $number_of_measure_for_wind_trend) $number_of_measure_for_wind_trend_data = $liner[1];
      if(trim($liner[0]) == $wind_trend_limit) $wind_trend_limit_data = $liner[1];
      if(trim($liner[0]) == $number_of_measure_for_wind_average_gust_calculation) $number_of_measure_for_wind_average_gust_calculation_data = $liner[1];
      if(trim($liner[0]) == $sensor_temp_out) $sensor_temp_out_data = $liner[1];
      if(trim($liner[0]) == $sensor_temp_in) $sensor_temp_in_data = $liner[1];
      if(trim($liner[0]) == $solarsensor) $solarsensor_data = $liner[1];
      if(trim($liner[0]) == $uvsensor) $uvsensor_data = $liner[1];
      if(trim($liner[0]) == $set_system_time_from_weatherstation) $set_system_time_from_weatherstation_data = $liner[1];
      if(trim($liner[0]) == $sensor_serial_port) $sensor_serial_port_data = $liner[1];
      
      if(trim($liner[0]) == $rtlsdr_frequency) $rtlsdr_frequency_data = $liner[1];
      if(trim($liner[0]) == $rtlsdr_bdl) $rtlsdr_bdl_data = $liner[1];
      if(trim($liner[0]) == $rtlsdr_ppm) $rtlsdr_ppm_data = $liner[1];
      if(trim($liner[0]) == $rtlsdr_timesync) $rtlsdr_timesync_data = $liner[1];
      
      if(trim($liner[0]) == $webcamdevice1) $webcamdevice1_data = $liner[1];
      if(trim($liner[0]) == $webcamdevice2) $webcamdevice2_data = $liner[1];
      if(trim($liner[0]) == $webcamlogo) $webcamlogo_data = $liner[1];
      if(trim($liner[0]) == $sendimagestoserver) $sendimagestoserver_data = $liner[1];
      if(trim($liner[0]) == $webcaminterval) $webcaminterval_data = $liner[1];
      if(trim($liner[0]) == $webcamdevice1captureresolution) $webcamdevice1captureresolution_data = $liner[1];
      if(trim($liner[0]) == $webcamdevice2captureresolution) $webcamdevice2captureresolution_data = $liner[1];
      if(trim($liner[0]) == $webcamdevice1finalresolution) $webcamdevice1finalresolution_data = $liner[1];
      if(trim($liner[0]) == $webcamdevice2finalresolution) $webcamdevice2finalresolution_data = $liner[1];
      if(trim($liner[0]) == $captureprogram) $captureprogram_data = $liner[1];
      if(trim($liner[0]) == $sendallimagestoserver) $sendallimagestoserver_data = $liner[1];
      if(trim($liner[0]) == $delete_images_on_sd) $delete_images_on_sd_data = $liner[1];
      
      if(trim($liner[0]) == $usecameradivice) $usecameradivice_data = $liner[1];
      if(trim($liner[0]) == $cameradivicefinalresolution) $cameradivicefinalresolution_data = $liner[1];
      if(trim($liner[0]) == $gphoto2options) $gphoto2options_data = $liner[1];
      if(trim($liner[0]) == $gphoto2options_night) $gphoto2options_night_data = $liner[1];
      if(trim($liner[0]) == $reset_usb) $reset_usb_data = $liner[1];
      if(trim($liner[0]) == $clear_all_sd_cards_at_startup) $clear_all_sd_cards_at_startup_data = $liner[1];
      if(trim($liner[0]) == $start_camera_number) $start_camera_number_data = $liner[1];
      if(trim($liner[0]) == $gphoto2_capture_image_and_download) $gphoto2_capture_image_and_download_data = $liner[1];
      if(trim($liner[0]) == $use_camera_resetter) $use_camera_resetter_data = $liner[1];
      if(trim($liner[0]) == $camera_resetter_normaly_on) $camera_resetter_normaly_on_data = $liner[1];
      if(trim($liner[0]) == $on_off_camera) $on_off_camera_data = $liner[1];

      if(trim($liner[0]) == $use_camerapi) $use_camerapi_data = $liner[1];
      if(trim($liner[0]) == $camerapi_day_settings) $camerapi_day_settings_data = $liner[1];
      if(trim($liner[0]) == $camerapi_night_settings) $camerapi_night_settings_data = $liner[1];
      if(trim($liner[0]) == $camerapi_timelapse) $camerapi_timelapse_data = $liner[1];
      if(trim($liner[0]) == $camerapi_timelapse_settings) $camerapi_timelapse_settings_data = $liner[1];

      if(trim($liner[0]) == $ipcaminterval) $ipcaminterval_data = $liner[1];
      if(trim($liner[0]) == $ipcamcfg) $ipcamcfg_data = $liner[1];
      if(trim($liner[0]) == $ipcamip1) $ipcamip1_data = $liner[1];
      if(trim($liner[0]) == $ipcamus1) $ipcamus1_data = $liner[1];
      if(trim($liner[0]) == $ipcampw1) $ipcampw1_data = $liner[1];
      if(trim($liner[0]) == $ipcamsn1) $ipcamsn1_data = $liner[1];
      if(trim($liner[0]) == $ipcamip2) $ipcamip2_data = $liner[1];
      if(trim($liner[0]) == $ipcamus2) $ipcamus2_data = $liner[1];
      if(trim($liner[0]) == $ipcampw2) $ipcampw2_data = $liner[1];
      if(trim($liner[0]) == $ipcamsn2) $ipcamsn2_data = $liner[1];
      if(trim($liner[0]) == $ipcamzzz) $ipcamzzz_data = $liner[1];
      if(trim($liner[0]) == $ipcamposn) $ipcamposn_data = $liner[1];
      if(trim($liner[0]) == $ipcamposne) $ipcamposne_data = $liner[1];
      if(trim($liner[0]) == $ipcampose) $ipcampose_data = $liner[1];
      if(trim($liner[0]) == $ipcamposse) $ipcamposse_data = $liner[1];
      if(trim($liner[0]) == $ipcamposs) $ipcamposs_data = $liner[1];
      if(trim($liner[0]) == $ipcampossw) $ipcampossw_data = $liner[1];
      if(trim($liner[0]) == $ipcamposw) $ipcamposw_data = $liner[1];
      if(trim($liner[0]) == $ipcamposnw) $ipcamposnw_data = $liner[1];

      if(trim($liner[0]) == $ftpserver) $ftpserver_data = $liner[1];
      if(trim($liner[0]) == $ftpserverdestfolder) $ftpserverdestfolder_data = $liner[1];
      if(trim($liner[0]) == $ftpserverlogin) $ftpserverlogin_data = $liner[1];
      if(trim($liner[0]) == $ftpserverpassowd) $ftpserverpassowd_data = $liner[1];
      if(trim($liner[0]) == $use_thread_for_sending_to_server) $use_thread_for_sending_to_server_data = $liner[1];
      
      if(trim($liner[0]) == $weatherunderground_logdata) $weatherunderground_logdata_data = $liner[1];
      if(trim($liner[0]) == $weatherunderground_id) $weatherunderground_id_data = $liner[1];
      if(trim($liner[0]) == $weatherunderground_password) $weatherunderground_password_data = $liner[1];
      if(trim($liner[0]) == $pws_logdata) $pws_logdata_data = $liner[1];
      if(trim($liner[0]) == $pws_id) $pws_id_data = $liner[1];
      if(trim($liner[0]) == $pws_password) $pws_password_data = $liner[1];
      if(trim($liner[0]) == $cwop_logdata) $cwop_logdata_data = $liner[1];
      if(trim($liner[0]) == $cwop_id) $cwop_id_data = $liner[1];
      if(trim($liner[0]) == $cwop_password) $cwop_password_data = $liner[1];
      if(trim($liner[0]) == $windfinder_logdata) $windfinder_logdata_data = $liner[1];
      if(trim($liner[0]) == $windfinder_id) $windfinder_id_data = $liner[1];
      if(trim($liner[0]) == $windfinder_password) $windfinder_password_data = $liner[1];
      
      if(trim($liner[0]) == $gmail_user) $gmail_user_data = $liner[1];
      if(trim($liner[0]) == $gmail_pwd) $gmail_pwd_data = $liner[1];
      if(trim($liner[0]) == $mail_to) $mail_to_data = $liner[1];
      if(trim($liner[0]) == $use_mail) $use_mail_data = $liner[1];
      if(trim($liner[0]) == $mail_ip) $mail_ip_data = $liner[1];
      
      if(trim($liner[0]) == $use_dnsexit) $use_dnsexit_data = $liner[1];
      if(trim($liner[0]) == $dnsexit_uname) $dnsexit_uname_data = $liner[1];
      if(trim($liner[0]) == $dnsexit_pwd) $dnsexit_pwd_data = $liner[1];
      if(trim($liner[0]) == $dnsexit_hname) $dnsexit_hname_data = $liner[1];
   }
   //echo $station_name_data;
  ?>

