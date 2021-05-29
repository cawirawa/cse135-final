package main
import (
	"fmt"
	"net/http"
	"net/http/cgi"
	"io/ioutil"
	"os"
	"encoding/json"
	"math/rand"
)

var (
	FILE_PREFIX string = "gosess_"
	FILE_SUFFIX string = ".json"
	SESSION_LOCATION string = "/tmp/gosess/"
)

type SessionData struct {
	Username *string
}

type Session struct {
	SessionID string
	Data *SessionData
}

func (this *Session) GetSession() (error) {
	jsonFile, err := os.Open(SESSION_LOCATION + FILE_PREFIX + this.SessionID + FILE_SUFFIX)
	if err != nil {
		return err
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	return	json.Unmarshal(byteValue, this)
}

func (this *Session) StoreSession() (error) {

	data, err := json.MarshalIndent(this, "", " ")
	if err != nil {
		return err
	}

	file, err := os.Create(SESSION_LOCATION + FILE_PREFIX + this.SessionID + FILE_SUFFIX)
	if err != nil {
		println(err.Error())
		println(1)
		return err
	}
	defer file.Close()


	if _, err := file.Write(data); err != nil {
		println(err.Error())
		println(2)

		return err
	}
	return nil
}


func (this *Session) CreateSessionID() {
	newID := rand.Int()
	newIDString := fmt.Sprintf("%d", newID)
	_, err := os.Open(SESSION_LOCATION + FILE_PREFIX + newIDString + FILE_SUFFIX)
	for err == nil {
		newID = rand.Int()
		newIDString = fmt.Sprintf("%d", newID)
		_, err = os.Open(SESSION_LOCATION + FILE_PREFIX + newIDString + FILE_SUFFIX)
	}

	this.SessionID = newIDString
}

func (this *Session) DeleteSession() error {
	err := os.Remove(SESSION_LOCATION + FILE_PREFIX + this.SessionID + FILE_SUFFIX)
    if err != nil {
        return err
    }
	return nil

}

func main() {

	if err := cgi.Serve(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		
		html := ``
		
		var sessionID, err = r.Cookie("session-go")

		if err == nil {
			session := &Session{}

			session.SessionID = sessionID.Value
			err := session.DeleteSession()
			if err != nil {
				println(w, "Something Went Wrong 1")
			}
		}
			
		c := &http.Cookie{
			Name : "session-go", 
			Value: "",
			HttpOnly: false,
			Path: "/",
			Domain: "woiks.xyz",
			MaxAge:   -1,
		}
		
		http.SetCookie(w, c)

		header := w.Header()
		header.Set("Content-Type", "Content-Type: text/html")
		
		html += "<html><head><title>Go Sessions</title></head>"
		html += "<body><h1>Session Destroyed</h1>"


		
		html += `
		<br/><br/>
		<a href="/cgi-bin/go-state-demo.cgi">Back to the Go CGI Form</a><br/>
		<a href="/cgi-bin/go-sessions-1.cgi">Back to Page 1</a><br/>
		<a href="/cgi-bin/go-sessions-2.cgi">Back to Page 2</a><br/>
		<a href="/">Home</a><br/>
		</body>
		</html>
		`

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(html))

	})); err != nil {
		fmt.Println(err)
	}
 }