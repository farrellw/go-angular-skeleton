package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type User struct {
	Password string `json:password`
	Username string `json:username`
	Email string `json:email`
}

var session *mgo.Session
var col *mgo.Collection

func ListEndpoint(w http.ResponseWriter, req *http.Request) {
	var users []User
	err := col.Find(bson.M{}).Limit(50).All(&users)

	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(users)
}

func SearchEndpoint(w http.ResponseWriter, req *http.Request) {
	var users []User
	params := mux.Vars(req)
	err := col.Find(bson.M{"username": params["username"]}).All(&users)

	if err != nil {
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(users)
}

func CreateEndpoint(w http.ResponseWriter, req *http.Request) {
	var user User
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
	fmt.Println("Starting server at http://localhost:12345...")
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
	log.Fatal(http.ListenAndServe(":12345", handlers.CORS(handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
