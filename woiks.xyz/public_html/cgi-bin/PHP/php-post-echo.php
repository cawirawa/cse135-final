<?php
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "POST message body";
include("navigation.php");             // if required
echo("<title>$page_title</title>");

echo "<div align='center'><h1 align=centre>POST message body</h1></div>"."<br>";
echo"<hr>";
echo "message body: ". "<br>";
echo '<pre>'; print_r($_POST); echo '</pre>';
?>



