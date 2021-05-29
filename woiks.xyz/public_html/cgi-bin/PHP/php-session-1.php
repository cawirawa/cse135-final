<?php
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "Session 1";
include("navigation.php");             // if required
echo("<title>$page_title</title>");

$name = $_POST['my_html_input_tag'];
$session = $_POST['session'];

if ($session) {
    $name = '';
    unset($_COOKIE["name"]);
    setcookie("name","",1,'/');
    setcookie("name", '', 1, '/cgi-bin/PHP/php-session-1.php'); 
    setcookie("name", '', 1, '');
}
if($name) {
    setcookie("name", $name, time() + (86400 * 30), "/"); // 86400 = 1 day
    $_POST['my_html_input_tag'] = '';
    echo "<h1><b>PHP Sessions Page 1</b></h1>";
    echo "Name: " . $name;
    
}else{

    echo "<h1><b>PHP Sessions Page 1</b></h1>";
    if(!isset($_COOKIE["name"])) {
        echo "session is not set!";
    } else {
        echo "Name: " . $_COOKIE["name"];
    }

}
?>

<html>
<body>
    <br>
    <br>
    <a href="php-session-2.php">Session 2</a>
    <br>
    <a href="php-state-demo.php">PHP CGI Form</a>
    <br>
    <br>
    <form action="php-session-1.php" method="post">
        <input type="submit" name="session" 
           value="Destroy Sessioning"/>
    </form>
</body>
</html>