import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import User from '../users/user';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit { 
  private user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.user = data.user;
    console.log("We have this user here");
    console.log(this.user);
  }

  ngOnInit() {
  }

}
