<?php
if (isset($_GET['ajax'])) {
  session_start();
  
	$files = glob('/home/pi/meteopi/log/*.*');
	$files = array_combine($files, array_map('filectime', $files));
	arsort($files);
	$handle = fopen( key($files), 'r'); 
  
  //$handle = fopen("/home/pi/meteopi/log/log".date('dmY').".log", 'r');
  if (isset($_SESSION['offset'])) {
    $data = stream_get_contents($handle, -1, $_SESSION['offset']);
    echo nl2br($data);
  } else {
    fseek($handle, 0, SEEK_END);
    $_SESSION['offset'] = ftell($handle);
  } 
  exit();
} 
?>
<!doctype html>
<html lang="en">
<head>

<style>
 body {
 background-color: #000000;
 color: #D3D3D3;
 font-family: Arial, Helvetica, sans-serif;
 font-size: 13px;
 }
</style>

  <meta charset="UTF-8">
  <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
  <script src="http://creativecouple.github.com/jquery-timing/jquery-timing.min.js"></script>
  <script>
  $(function() {
    $.repeat(10000, function() {
      $.get('readlog.php?ajax', function(data) {
        $('#tail').empty();

        $('#tail').append(data);
        window.scrollTo(0,document.body.scrollHeight);
      });
    });
  });
  </script>
</head>
<body>
  <div id="tail">Starting up...</div>
</body>
</html>
