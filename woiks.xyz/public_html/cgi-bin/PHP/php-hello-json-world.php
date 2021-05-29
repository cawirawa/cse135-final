<?php
// We'll be outputting a PDF
header('Content-Type: text/html');

header('Cache-Control: application/json');

$myObj->title = "Hello, PHP";
$myObj->heading = "Carlos and Nikolas was here - Hello, PHP!";
$myObj->message = "This page was generated with the PHP programming language";
$myObj->time = "Current Time: " . date("D F j H:i:s  Y");
$myObj->IP = "Your IP Address:" . $_SERVER['REMOTE_ADDR'];$myJSON = json_encode($myObj);

echo $myJSON;
?>
