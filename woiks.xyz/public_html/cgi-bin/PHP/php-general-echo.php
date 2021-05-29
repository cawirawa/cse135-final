<?php
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "General Request Echo";
include("navigation.php");             // if required
echo("<title>$page_title</title>");

echo "<div align='center'><h1 align=centre>General Request Echo</h1></div>"."<br>";
echo"<hr>";
echo "<p><b>HTTP Protocol:</b> {$_SERVER[SERVER_PROTOCOL]}</p>";
echo "<p><b>HTTP Method:</b> {$_SERVER[REQUEST_METHOD]}$</p>";
echo "<p><b>Query String:</b>";
if($_SERVER[QUERY_STRING]) echo $_SERVER[QUERY_STRING]. "</p>";
echo "<p><b>Message body:</b>" . "</p>";
if ($_SERVER[REQUEST_METHOD] == ' POST$') echo '<p><pre>'.print_r($_POST). '</pre></p>';
?>



