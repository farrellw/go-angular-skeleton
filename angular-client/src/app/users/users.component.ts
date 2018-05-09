import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import User from './user';
import { UserService } from './user.service';
import { UserRowComponent } from './user-row/user-row.component'
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  public users: User[]

  public constructor(private http: Http, private router: Router, private location: Location, private userService: UserService) {
  }

  ngOnInit() {
    this.location.subscribe(() => {
      this.refresh();
    });
    this.refresh();
  }

  private refresh() {
    this.userService.getUsers().subscribe(result => {
        this.users = result;
    });
  }

  public search(event: any) {
    this.userService.searchUsers(event.target.value).subscribe(result => {
      this.users = result
    })
  }

  public create() {
    this.router.navigate(["create"]);
  }
}
