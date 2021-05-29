package main
import (
	"fmt"
	"os"
)

func main() {
  // Print HTML header
  fmt.Printf("Cache-Control: no-cache\n");
  fmt.Printf("Content-type: text/html\n\n");
  fmt.Printf(`<html><head><title>Environment Variables</title></head>
  <body><h1 align=center>Environment Variables</h1>
	<hr/>`);
  
	for _, env := range os.Environ() {
    fmt.Printf("%s\n<br/>", env);
  }
  fmt.Printf("</body></html>");


 }