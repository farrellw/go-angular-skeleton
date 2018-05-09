import { Injectable } from '@angular/core';
import User from './user';
import MockUsers from './mock-users';
import { Observable, of } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }
  
  getUsers(): Observable<User[]> {
    return this.http.get("http://localhost:12345/users")
      .map(result => result.json())
    // return of(MockUsers)
  }

  getOneUser(username): Observable<User>{
    let url = "http://localhost:12345/users/";
    if (username) {
      url = url + username;
    }

    console.log("Sending url to the following", url);

    return this.http.get(url)
    .map(result => result.json());
    // return of(MockUsers[0]);
  }

  searchUsers(value): Observable<User[]>{
    let url = "http://localhost:12345/users";
    if (value) {
      url = "http://localhost:12345/search/" + value;
    }
    // return this.http.get(url)
    //   .map(result => result.json());
    return of(MockUsers);
  }
}
