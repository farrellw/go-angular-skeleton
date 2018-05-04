import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import User, { MyUser } from './user';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  public users: User[]

  public constructor(private http: Http, private router: Router, private location: Location) {
    this.users = [];
  }

  ngOnInit() {
    this.location.subscribe(() => {
      this.refresh();
    });
    this.refresh();
  }

  private refresh() {
    this.http.get("http://localhost:12345/users")
      .map(result => result.json())
      .subscribe(result => {
        this.users = result;
      });
  }

  public search(event: any) {
    let url = "http://localhost:12345/users";
    if (event.target.value) {
      url = "http://localhost:12345/search/" + event.target.value;
    }
    this.http.get(url)
      .map(result => result.json())
      .subscribe(result => {
        this.users = result;
      });
  }

  public create() {
    this.router.navigate(["create"]);
  }
}
