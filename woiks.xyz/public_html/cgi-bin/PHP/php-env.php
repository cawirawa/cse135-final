<?php
// We'll be outputting a PDF
header('Content-Type: text/html');
header('Cache-Control: no-cache');

$page_title = "Environment Variables";
include("navigation.php");             // if required
echo("<title>$page_title</title>");

//function taken from https://www.php.net/manual/en/function.phpinfo.php
function phpinfo_array()
{
    ob_start();
    phpinfo();
    $info_arr = array();
    $info_lines = explode("\n", strip_tags(ob_get_clean(), "<tr><td><h2>"));
    $cat = "General";
    foreach($info_lines as $line )
    {
        // new cat?
        
        preg_match("~<h2>(.*)</h2>~", $line, $title) ? $cat = $title[1] : null;
        if ($cat == "Apache Environment"){
            if(preg_match("~<tr><td[^>]+>([^<]*)</td><td[^>]+>([^<]*)</td></tr>~", $line, $val))
            {
                echo $val[1].": ".$val[2]."<br>";
            }
        }
    }
    return;
}

echo "<div align='center'><h1 align=centre>Environment Variables</h1></div>"."<br>";
echo"<hr>";
phpinfo_array();
?>