package main
import (
	"fmt"
	"os"
	"bufio"
)

func main() {
	protocol := os.Getenv("SERVER_PROTOCOL")
	method := os.Getenv("REQUEST_METHOD")
  	// Print HTML header
 	fmt.Printf("Cache-Control: no-cache\n");
 	fmt.Printf("Content-type: text/html\n\n");
  	fmt.Printf(`<html><head><title>General Request Echo</title></head> 
	  <body><h1 align=center>General Request Echo</h1>
		<hr/>`);
	fmt.Printf("<table>\n");
  
	fmt.Printf("<tr><td>Protocol:</td><td>%s</td></tr>\n", protocol)
	fmt.Printf("<tr><td>Method:</td><td>%s</td></tr>\n", method)
	reader := bufio.NewReader(os.Stdin)

	var text []byte
	text, _, _ = reader.ReadLine()

	if len(text) == 0 {
		text = []byte("(null)")
	}
	
	fmt.Printf("Message Body: %s\n<br/>", text);
	
  	fmt.Printf("</table>");
  	fmt.Printf("</body></html>");


 }