package main

//todo
//Concept of Local, Development, Production.
//Configuration loaded from file
//Wrapped into docker containers.
//Connected to Auth.
//Authenticate users when they come in.

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/farrellw/golang-angular-skeleton/configuration"
	"github.com/joho/godotenv"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

type User struct {
	Username string
	Password string
}

type Patient struct {
	Username string `json:username`
	Email    string `json:email`
}

var session *mgo.Session
var col *mgo.Collection
var port string
var databaseURL string
var config configuration.Config

func init() {
	godotenv.Load()
	stage := os.Getenv("STAGE")
	if stage == "" {
		stage = "local"
	}

	config = configuration.LoadConfig(stage)
	configValues := config.ConfigValues
	port = configValues.Port
	databaseURL = configValues.DatabaseURL
	log.Info(config)
	log.Info(port)
	log.Info(databaseURL)
}

func ListEndpoint(w http.ResponseWriter, req *http.Request) {
	var users []Patient
	err := col.Find(bson.M{}).Limit(50).All(&users)

	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(users)
}

func SearchEndpoint(w http.ResponseWriter, req *http.Request) {
	var users []Patient
	params := mux.Vars(req)
	err := col.Find(bson.M{"username": bson.RegEx{params["username"], "i"}}).Limit(50).All(&users)

	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(users)
}

func CreateEndpoint(w http.ResponseWriter, req *http.Request) {
	var user Patient
	var err error
	err = json.NewDecoder(req.Body).Decode(&user)
	if err != nil {
		fmt.Println(err)
	}

	err = col.Insert(user)
	if err != nil {
		fmt.Println(err)
	}
	json.NewEncoder(w).Encode(user)
}

func main() {
	var err error
	session, err = mgo.Dial("mongodb://localhost:27017")
	if err != nil {
		fmt.Println(err)
	}
	defer session.Close()

	col = session.DB("practice-go").C("user")

	router := mux.NewRouter()
	router.HandleFunc("/users", ListEndpoint).Methods("GET")
	router.HandleFunc("/users", CreateEndpoint).Methods("POST")
	router.HandleFunc("/search/{username}", SearchEndpoint).Methods("GET")

	fmt.Println("Starting server at http://localhost:12345...")
	log.Fatal(http.ListenAndServe(":12345", handlers.CORS(handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
