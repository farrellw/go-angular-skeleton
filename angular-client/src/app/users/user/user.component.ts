import { Component, OnInit, Inject } from '@angular/core';
import User from '../user';
import { UserService } from '../user.service'
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserModalComponent implements OnInit {
  private user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { 
    this.user = data.user;
  }

  ngOnInit() {
    this.userService.getOneUser(this.user.Username)
    .subscribe(result => { 
      this.user = result;
    })
  }
}
