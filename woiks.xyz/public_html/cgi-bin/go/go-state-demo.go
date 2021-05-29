package main
import (
	"fmt"
	// "os"
)

func main() {
  // Print HTML header
  fmt.Printf("Cache-Control: no-cache\n");
  fmt.Printf("Content-type: text/html\n\n");
  fmt.Printf(`
<html>
  <head>
  	<title>CGI Form</title>
  </head>
  	<body>
  		<h1 align=center>Session Test</h1>
		<hr/> 
		<p>CGI using Go Language</p>
		<form style="margin-top: 30px;" action="/cgi-bin/go-sessions-1.cgi" method="POST">
			<label>
				What is your name?
				<input type="text" name="username" autocomplete="off" />
			</label>
			<input type="submit" value="Test Sessioning" />
		</form>
		<a href="/" style="display: inline-block; margin-top: 20px;">Home</a>
	</body>
</html>`);
 


 }