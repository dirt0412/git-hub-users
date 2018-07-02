import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ContributorsService } from "./../../Services/contributors.service";
import { RepositoryDetailsModel } from '../../models/RepositoryDetailsModel';
import { PagerService } from './../../common/pagination/pagination.component';

@Component({
  selector: 'app-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css']
})
export class RepositoryDetailsComponent implements OnInit {
  public repositoryDetailsModelItem: RepositoryDetailsModel;
 
  id: String;
  login: String;
  _timeout: any = null;
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
    this.contributorsService.getRepoDetails(id, login, this.pager1.currentPage, this.pager1.perPage).subscribe((repoDetails) => {
      repoDetails.forEach(element => {
        this.repositoryDetailsModelItem.repoArrDetails.push(element);
      });
      //this.repositoryDetailsModelItem.repoArrDetails = repoDetails;

      //console.log(this.repositoryDetailsModelItem.repoArrDetails.length);

      // this.pager1.totalItems = this.repositoryDetailsModelItem.repoArrDetails != undefined ? this.repositoryDetailsModelItem.repoArrDetails.length : 0
      // this.pager1.pageSize = 30
      // this.pager1.startIndex = 0;//pagination
      // this.pager1.endIndex = 0;//pagination
      // this.pager1.pages = []
      // this.pagedItems = []
      // this.setPage(this.pager1.currentPage);
      // this.pager1.totalPages = Math.ceil((this.repositoryDetailsModelItem.repoArrDetails != undefined ? this.repositoryDetailsModelItem.repoArrDetails.length : 0) / 30);
      //console.log(repoDetails);
    });
  }

  // paged items
  // pagedItems: any[];
  // setPage(page: number) {
  //   //console.log(page);
  //   if (page < 1 || page > this.pager1.totalPages) {
  //     return;
  //   }
  //   if (page !== this.pager1.currentPage) {
  //     this.pager1.currentPage = page
  //     this.getRepoDetails(this.id, this.login);
  //   } else {
  //     // get pager object from service
  //     this.pager1 = this.pagerService.getPager(this.pager1.totalItems, page, this.pager1.pageSize);
  //     // get current page of items
  //     this.pagedItems = this.repositoryDetailsModelItem.repoArrDetails.slice(this.pager1.startIndex, this.pager1.endIndex + 1);
  //   }
  // }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    console.log('repo-det');
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

}
