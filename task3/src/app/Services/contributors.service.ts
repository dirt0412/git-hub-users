import { Injectable } from '@angular/core';
import { ContributorsModel } from '../models/ContributorsModel';
import { RepositoryDetailsModel } from '../models/RepositoryDetailsModel';
import { Observable } from "rxjs";
import { Http, RequestOptions, Headers } from "@angular/http";
import { environment } from '../../environments/environment';
import 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ContributorsService {

  constructor(private http: Http) { }

  //https://developer.github.com/v3/repos/#list-contributors
  getContributors(page, perPage): Observable<ContributorsModel[]> {
    return this.http.get(environment.urpApiRootEndpoint+'repos/angular/angular/contributors?page='+page+'&per_page='+perPage).pipe(
      map((res) => res.json())
    );//https://api.github.com/repos/angular/angular/contributors
  }

  //https://developer.github.com/v3/users/#get-a-single-user
  getContributorsById(login: String): Observable<ContributorsModel> {
    return this.http.get(environment.urpApiRootEndpoint +'users/'+ login).pipe(
      map((res) => res.json())
    );
  }
  //https://developer.github.com/v3/repos/#list-user-repositories
  getUserRepo(login: String,page, perPage): Observable<any[]> {
    return this.http.get(environment.urpApiRootEndpoint + 'users/' + login + '/repos'+ '?page='+page+'&per_page='+perPage).pipe(
      map((res) => res.json())
    );
  }

  //https://developer.github.com/v3/repos/#list-contributors
  getRepoDetails(repoName: String, login: String, page, perPage): Observable<RepositoryDetailsModel[]> {
    return this.http.get(environment.urpApiRootEndpoint + 'repos/' + login + '/' + repoName + '/contributors?page='+page+'&per_page='+perPage).pipe(
      map((res) => res.json())
    );

  }





}