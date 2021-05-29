<?php
// We'll be outputting a PDF
header('Content-Type: text/html');

header('Cache-Control: no-cache');

$page_title = "Hello, PHP!";        
echo("<title>$page_title</title>");

echo "<h1>Carlos and Nikolas was here - Hello, PHP!</h1>" . "<br>";
echo "This page was generated with the PHP programming language" . "<br>" . "<br>";
echo "Current Time: " . date("D F j H:i:s  Y") . "<br>" . "<br>";
echo "Your IP Address:" . $_SERVER['REMOTE_ADDR'];
?>