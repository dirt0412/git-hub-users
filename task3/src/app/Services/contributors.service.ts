import { Injectable } from '@angular/core';
import { ContributorsModel } from '../models/ContributorsModel';
import { RepositoryDetailsModel } from '../models/RepositoryDetailsModel';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContributorsService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {

    this.headers = new  HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token ' + environment.keyApi
    });
  }

  //https://developer.github.com/v3/repos/#list-contributors
  getContributors(page, perPage): Observable<ContributorsModel[]> {
    return this.http.get<ContributorsModel[]>(`${environment.urpApiRootEndpoint}repos/angular/angular/contributors?page=` + page + `&per_page=` + perPage , {
      headers: this.headers} 
    );      
  }

  //https://developer.github.com/v3/users/#get-a-single-user
  getContributorsById(login: String): Observable<ContributorsModel> {
    return this.http.get<ContributorsModel>(`${environment.urpApiRootEndpoint}users/` + login , {
      headers: this.headers} 
    ); 
  }
  //https://developer.github.com/v3/repos/#list-user-repositories
  getUserRepo(login: String, page, perPage): Observable<any[]> {
    return this.http.get<any[]>(`${environment.urpApiRootEndpoint}users/` + login + `/repos?page=` + page + `&per_page=` + perPage , 
    {
      headers: this.headers} 
    ); 
  }

  //https://developer.github.com/v3/repos/#list-contributors
  getRepoDetails(repoName: String, login: String, page, perPage): Observable<RepositoryDetailsModel[]> {
    return this.http.get<RepositoryDetailsModel[]>(`${environment.urpApiRootEndpoint}repos/` + login + `/` + repoName + `/contributors?page=` + page + `&per_page=` + perPage , 
    {
      headers: this.headers} 
    ); 

  }


}