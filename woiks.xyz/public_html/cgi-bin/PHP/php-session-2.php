<?php
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "Session 2";
include("navigation.php");             // if required
echo("<title>$page_title</title>");

$session = $_POST['session'];
if ($session) {
    $name = '';
    unset($_COOKIE["name"]);
    setcookie("name","",1,'/');
    setcookie("name", '', 1, '/cgi-bin/PHP/php-session-1.php'); 
    setcookie("name", '', 1, '');
}

echo "<h1><b>PHP Sessions Page 1</b></h1>";
if(!isset($_COOKIE["name"])) {
    echo "session is not set!";
  } else {
    echo "Name: " . $_COOKIE["name"];
  }
?>
<html>
<body>
    <br>
    <br>
    <a href="php-session-1.php">Session 1</a>
    <br>
    <a href="php-state-demo.php">PHP CGI Form</a>
    <br>
    <br>
    <form action="php-session-2.php" method="post">
        <input type="submit" name="session" 
           value="Destroy Sessioning"/>
    </form>
</body>
</html>