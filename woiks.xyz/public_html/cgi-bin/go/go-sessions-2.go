package main
import (
	"fmt"
	"net/http"
	"net/http/cgi"
	"io/ioutil"
	"os"
	"encoding/json"
	"math/rand"
	// "strings"
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

func main() {

	if err := cgi.Serve(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		
		html := ``
		
		r.ParseForm()
		form := r.Form
		username := form.Get("username")
		
		var sessionID, err = r.Cookie("session-go")
		session := &Session{}

		if err != nil && username != "" {
			session.CreateSessionID()
			cookie := http.Cookie{ 
				Name : "session", 
				Value: session.SessionID,
				HttpOnly: false,
				Path: "/",
				Domain: "woiks.xyz",
			}
			http.SetCookie(w, &cookie)
			session.Data = &SessionData{}
		} else if sessionID != nil {
			println(1)
			session.SessionID = sessionID.Value
			err := session.GetSession()
			if err != nil {
			println(2)

				session.CreateSessionID()
				cookie := http.Cookie{ 
					Name : "session-go", 
					Value: session.SessionID,
					HttpOnly: false,
					Path: "/",
					Domain: "woiks.xyz",
				}
				http.SetCookie(w, &cookie)
				session.Data = &SessionData{}
			}	
			if session.Data.Username != nil {
				username = *session.Data.Username
			}
		}

		header := w.Header()
		header.Set("Content-Type", "Content-Type: text/html")
		
		html += "<html><head><title>Go Sessions</title></head>"
		html += "<body><h1>Go Sessions Page 2</h1>"

		if session.Data != nil {
			if username != "" {
				html += fmt.Sprintf("<p><b>Name:</b> %s</p>", username)
	
			} else if tmp := session.Data.Username; tmp != nil {
				html += fmt.Sprintf("<p><b>Name:</b> %s</p>", *tmp)
				username = *tmp
			} else {
				html += "<p><b>Name:</b> You do not have a name set</p>"
			}
			session.Data.Username = &username
		} else {
			html += "<p><b>Name:</b> You do not have a name set</p>"
		}


		if sessionID != nil {
			err = session.StoreSession()
			if err != nil {
				println(w, "Something Went Wrong 2", err.Error())
			}
		}
		
		html += `
		<br/><br/>
		<a href="/cgi-bin/go-sessions-1.cgi">Session Page 1</a><br/>
		<a href="/cgi-bin/go-state-demo.cgi">Go CGI Form</a><br />
		<form style="margin-top:30px" action="/cgi-bin/go-destroy-session.cgi" method="get">
			<button type="submit">Destroy Session</button>
		</form>
		</body>
		</html>
		`

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(html))

	})); err != nil {
		fmt.Println(err)
	}
 }