<?php
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "CGI Form";        
echo("<title>$page_title</title>");

echo "<div align='center'><h1 align=centre>CGI Form</h1></div>"."<br>";
echo"<hr>";
echo "CGI using PHP". "<br>";
?>
<html>
<script src="/collector.js"></script>
<body>
  <form action="php-session-1.php" method="post">
    <div>What is your name? </div>
    <input name="my_html_input_tag"/>
    <input type="submit" name="my_form_submit_button" 
           value="Test Sessioning"/>

    </form>
</body>
</html>