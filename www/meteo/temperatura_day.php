<?php // content="text/plain; charset=utf-8"

require_once("config.php");

if(empty($_GET['DATE'])){
    $data = date("d-m-Y");
}
else{
   $data = $_GET['DATE'];
}


$con = new mysqli($server,$user,$pwd,$db);

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

$sql = "SELECT * FROM `METEO` WHERE date( `TIMESTAMP_LOCAL` ) = STR_TO_DATE('".$data."', '%d-%m-%Y') ORDER BY `METEO`.`TIMESTAMP_LOCAL` ASC";
$result = $con->query($sql);
$chart_data = '';
$ymin = 10000;
$ymax = 0;

$i = 0;
while ( $row = $result->fetch_row() )
{
	$i = $i + 1;
  $chart_data .= "{ timestamp:'".$row[0]."', temperatura:".$row[6]."}, ";
  if($row[6]<$ymin){
    $ymin = $row[6];
  }
  if($row[6]>$ymax){
    $ymax = $row[6];
  }

}

//$chart_data = substr($chart_data, 0, -2);

if ( $i == 0 )
{
	echo "No data avalaible for the selected date :".$data."<br>";
	exit();
}

?>

<!DOCTYPE html>
<html>
 <head>
  <title>Observatory Weather Station</title>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>

 </head>
 <body>
  <br /><br />
  <div class="container" style="width:900px;">
   <h2 align="center">Andamento Temperatura del <?php echo $data; ?></h2>
   <h3 align="center">Min: <?php echo $ymin; ?> Max: <?php echo $ymax; ?></h3>

   <br /><br />

   <div id="chart"></div>
  </div>
 </body>
</html>

<script>
Morris.Line({
 element : 'chart',
 data:[<?php echo $chart_data; ?>],
 xkey:'timestamp',
 ykeys:['temperatura'],
 ymax: <?php echo $ymax; ?>+2.0,
 ymin: <?php echo $ymin; ?>-0.5,
 labels:['temperatura']//,
 //hideHover:'auto',
 //stacked:true
});
</script>
