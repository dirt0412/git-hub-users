import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
const APP_ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'contributors' },
  { path: 'contributors', component: <any>ContributorsComponent },
  { path: 'contributors-details/:id', component: <any>ContributorsDetailsComponent },
  { path: 'repository-details', component: <any>RepositoryDetailsComponent }
];
import { ContributorsService } from "./Services/contributors.service";

//views
import { ContributorsComponent } from './views/contributors/contributors.component';
import { ContributorsDetailsComponent } from './views/contributors-details/contributors-details.component';
import { RepositoryDetailsComponent } from './views/repository-details/repository-details.component';

import { SidebarComponent } from './core-module/sidebar/sidebar.component';
import { PagerService } from './common/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    ContributorsComponent,
    ContributorsDetailsComponent,
    RepositoryDetailsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true })
  ],
  exports: [SidebarComponent, RouterModule],
  providers: [ContributorsService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
