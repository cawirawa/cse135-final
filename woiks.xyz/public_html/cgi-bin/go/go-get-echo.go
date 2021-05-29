package main
import (
	"fmt"
	"os"
)

func main() {
	query := os.Getenv("QUERY_STRING")
  	// Print HTML header
 	fmt.Printf("Cache-Control: no-cache\n");
 	fmt.Printf("Content-type: text/html\n\n");
  	fmt.Printf(`<html><head><title>GET query string</title></head>
  		<body><h1 align=center>GET query string</h1>
		<hr/>`);
	fmt.Printf("Raw query string: %s\n<br/><br/>", query);
	fmt.Println("<table> Formatted Query String:<br/>");
  
	for i := 0; i < len(query); i++ {
		if string(query[i]) == "=" {
			fmt.Printf(":\t");
		} else if string(query[i]) == "&" {
			fmt.Printf("<br/>");
		}  else {
			fmt.Printf("%s",string(query[i]));
		}
	}
	
  	fmt.Printf("</table>");
  	fmt.Printf("</body></html>");


 }