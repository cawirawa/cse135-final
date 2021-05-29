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

func (this *Session) Mkdir(sessionID string) string {
	result := ""

	if err := os.MkdirAll( SESSION_LOCATION + FILE_PREFIX +sessionID,0777); err != nil {
		return ""
	}

	return result
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
		println("woiks:", err.Error())
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
			sessionID = &http.Cookie{ 
				Name : "session-go", 
				Value: session.SessionID,
				HttpOnly: false,
				Path: "/",
				Domain: "woiks.xyz",
			}
			http.SetCookie(w, sessionID)
			session.Data = &SessionData{}
			 
		} else if sessionID != nil {
			session.SessionID = sessionID.Value
			err := session.GetSession()
			if err != nil {
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
			}	
		}

		header := w.Header()
		header.Set("Content-Type", "Content-Type: text/html")
		
		html += "<html><head><title>Go Sessions</title></head>"
		html += "<body><h1>Go Sessions Page 1</h1>"

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
			i := 0
			for err != nil && i != 2 {
				session.Mkdir(session.SessionID)
				println(w, "Something Went Wrong 2", err.Error())
				err = session.StoreSession()
				i++
			}
		}
		
		html += `
		<br/><br/>
		<a href="/cgi-bin/go-sessions-2.cgi">Session Page 2</a><br/>
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