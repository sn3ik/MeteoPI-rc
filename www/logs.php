<?php
  $path = '/home/pi/meteopi/log/';
  if ($handle = opendir($path)) {
    while (false !== ($file = readdir($handle))) {
      if ($file != "." && $file != "..") {
        $thelist .= '<li><a href="download.php?file='.$file.'&path='.$path.'">'.$file.'</a></li>';
      }
    }
    closedir($handle);
  }
?>
<h1>List of log:</h1>
<ul><?php echo $thelist; ?></ul>
