import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router, UrlSerializer } from '@angular/router';
import { Location } from '@angular/common';
import {MatDialog, MatDialogConfig} from "@angular/material";
import User from '../user';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: '[myTr]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})

export class UserRowComponent implements OnInit{
    @Input('user') user: User;

    public constructor(private http: Http, private dialog: MatDialog){
        
    }

    viewUser(e){
        e.preventDefault();
        console.log("View user clicked");
        console.log(this.user);
        var dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.data = { user: this.user}

        this.dialog.open(ModalComponent, dialogConfig)
    }

    ngOnInit() {
        // this.location.subscribe(() => {
        //   this.refresh();
        // });
        // this.refresh();
    }
}