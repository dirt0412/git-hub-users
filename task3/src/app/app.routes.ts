import { Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { ContributorsComponent } from "./views/contributors/contributors.component";
import { ContributorsDetailsComponent } from "./views/contributors-details/contributors-details.component";
import { RepositoryDetailsComponent } from "./views/repository-details/repository-details.component";

export const ROUTES: Routes = [

  // App views
  {
    path: '', component: AppComponent,
    children: [
      { path: 'contributors', component: ContributorsComponent }
    ]
  },
  {
    path: '', component: AppComponent,
    children: [
      { path: 'contributors-details/:id', component: ContributorsDetailsComponent }
    ]
  },
  {
    path: '', component: AppComponent,
    children: [
      { path: 'repository-details/:id/:login', component: RepositoryDetailsComponent }
    ]
  }
]