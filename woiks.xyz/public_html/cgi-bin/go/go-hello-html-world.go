package main
import (
	"fmt"
	"time"
	"os"
)
func main() {
        fmt.Printf("Cache-Control: no-cache\n")
        fmt.Printf("Content-Type: text/html\n\n")
        fmt.Printf(`<html><head><title>Hello CGI World</title></head>
		<body><h1 align=center>Hello HTML World</h1>
		  <hr/>`)
		  fmt.Printf("Carlos and Nikolas was here - Hello World<br/>\n")
		  fmt.Printf("This program was generated at: %s\n<br/>", time.Now())
		  fmt.Printf("Your current IP address is: %s<br/>", os.Getenv("REMOTE_ADDR"))
		  fmt.Printf("</body></html>")
    }