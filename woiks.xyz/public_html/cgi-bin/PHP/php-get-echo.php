<?php
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "Get Query String";
include("navigation.php");             // if required
echo("<title>$page_title</title>");

echo "<div align='center'><h1 align=centre>Get Query String</h1></div>"."<br>";
echo"<hr>";
$raw = $_SERVER['QUERY_STRING'];
echo "Raw query string:". "<br>".$raw."<br>";
echo "Formatted query string:"."<br>";

for($i = 0; $i <= strlen($raw); $i++ ){
    if ($raw[$i] == "=") {
        echo ": ";
    } else if($raw[$i] == "&"){
        echo "<br/>";
    }  else {
        echo $raw[$i];
    }
}

?>



