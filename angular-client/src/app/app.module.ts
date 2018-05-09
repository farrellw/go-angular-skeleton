import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatInputModule, MatTableModule, MatDialogModule } from '@angular/material';
import 'hammerjs';

import { AvailableRoutes } from './app.routing';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { CreateComponent } from './create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { UserRowComponent } from './users/user-row/user-row.component';
import { UserModalComponent } from './users/user/user.component';


@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        CreateComponent,
        ModalComponent,
        UserRowComponent,
        UserModalComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        RouterModule.forRoot(AvailableRoutes),
        MatToolbarModule,
        MatInputModule,
        MatTableModule,
        MatDialogModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ UserModalComponent ]
})
export class AppModule { }