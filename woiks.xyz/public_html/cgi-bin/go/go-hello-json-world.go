package main
import (
	"fmt"
	"time"
	"os"
)

func main() {
  // Print HTML header
  fmt.Printf("Cache-Control: no-cache\n");
  fmt.Printf("Content-type: application/json\n\n");
  fmt.Printf("{\n\t\"message\": \"Carlos and Nikolas was here - Hello World\",\n");
  fmt.Printf("\t\"date\": \"%s\",\n", time.Now());
  fmt.Printf("\t\"currentIP\": \"%s\"\n}\n", os.Getenv("REMOTE_ADDR"));


 }