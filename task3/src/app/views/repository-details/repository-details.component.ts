import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ContributorsService } from "./../../Services/contributors.service";
import { RepositoryDetailsModel } from '../../models/RepositoryDetailsModel';
import { PagerService } from './../../common/pagination/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css']
})
export class RepositoryDetailsComponent implements OnInit, OnDestroy {
  public repositoryDetailsModelItem: RepositoryDetailsModel;
 
  id: String;
  login: String;
  _timeout: any = null;
  private intervalSubscriptionGetRepoDetails: Subscription;
  //pagination
  pager1: any = {
    currentPage: 1,
    perPage: 30
  };

  constructor(private contributorsService: ContributorsService, private route: ActivatedRoute, private pagerService: PagerService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.login = params['login'];
    });
    this.repositoryDetailsModelItem = new RepositoryDetailsModel();
    this.repositoryDetailsModelItem.repoArrDetails = [];
  }

  ngOnInit() {
    this.getRepoDetails(this.id, this.login);
  }

  getRepoDetails(id, login): void {
    this.intervalSubscriptionGetRepoDetails = this.contributorsService.getRepoDetails(id, login, this.pager1.currentPage, this.pager1.perPage).subscribe((repoDetails) => {
      repoDetails.forEach(element => {
        this.repositoryDetailsModelItem.repoArrDetails.push(element);
      });
     
    });
  }  

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.pager1.currentPage++;
        this.getRepoDetails(this.id, this.login);
        //console.log("load next page");
      }

    }, 500);
  }

  ngOnDestroy() {
    this.intervalSubscriptionGetRepoDetails.unsubscribe();
  }

}
