package main
import (
	"fmt"
	"os"
	"bufio"
)

func main() {
  	// Print HTML header
 	fmt.Printf("Cache-Control: no-cache\n");
 	fmt.Printf("Content-type: text/html\n\n");
  	fmt.Printf(`<html><head><title>POST Message Body</title></head>
	  <body><h1 align=center>POST Message Body</h1>
		<hr/>`);
	reader := bufio.NewReader(os.Stdin)

	var text []byte
	text, _, _ = reader.ReadLine()

	if len(text) == 0 {
		text = []byte("(null)")
	}
	
	fmt.Printf("Message Body: %s\n<br/>", text);

  	fmt.Printf("</body></html>");


 }