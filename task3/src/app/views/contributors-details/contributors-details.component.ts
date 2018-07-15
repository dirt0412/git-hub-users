import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ContributorsService } from "./../../Services/contributors.service";
import { ContributorsModel } from '../../models/ContributorsModel';
import { PagerService } from './../../common/pagination/pagination.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contributors-details',
  templateUrl: './contributors-details.component.html',
  styleUrls: ['./contributors-details.component.css']
})
export class ContributorsDetailsComponent implements OnInit, OnDestroy {
  public contributorsModelItem: ContributorsModel;
  loginContributor: String;
  private intervalSubscriptiongetUserRepo: Subscription;
  private intervalSubscriptiongetContributorsById: Subscription;
  //pagination
  pager1: any = {
    currentPage: 1,
    perPage: 30
  };

  constructor(private contributorsService: ContributorsService, private router: Router, private route: ActivatedRoute, private pagerService: PagerService) {
    this.route.params.subscribe(params => {
      this.loginContributor = params['id'];

    });
  }

  ngOnInit() {

    this.goToContributorsDetails(this.loginContributor);
  }

  goToContributorsDetails(login): void {
    this.intervalSubscriptiongetContributorsById = this.contributorsService.getContributorsById(login).subscribe((ContributorsModel) => {
      this.contributorsModelItem = ContributorsModel;

      this.intervalSubscriptiongetUserRepo = this.contributorsService.getUserRepo(login, this.pager1.currentPage, this.pager1.perPage).subscribe((userRepoArr) => {
        this.contributorsModelItem.repoArr = userRepoArr;

        this.pager1.totalItems = this.contributorsModelItem.public_repos
        this.pager1.pageSize = 30
        this.pager1.startIndex = 0;//pagination
        this.pager1.endIndex = 0;//pagination
        this.pager1.pages = []
        this.pagedItems = []
        this.setPage(this.pager1.currentPage);
        this.pager1.totalPages = Math.ceil(this.contributorsModelItem.public_repos / 30);

      });
    });

  }

  toRepositoryDetails(repo) {
    this.router.navigate(['/repository-details', { id: repo.name, login: repo.owner.login }]);
  }

  // paged items
  pagedItems: any[];
  setPage(page: number) {
    if (page < 1 || page > this.pager1.totalPages) {
      return;
    }
    if (page !== this.pager1.currentPage) {
      this.pager1.currentPage = page
      this.goToContributorsDetails(this.loginContributor);
    } else {
      // get pager object from service
      this.pager1 = this.pagerService.getPager(this.pager1.totalItems, page, this.pager1.pageSize);
      // get current page of items
      this.pagedItems = this.contributorsModelItem.repoArr.slice(this.pager1.startIndex, this.pager1.endIndex + 1);
    }
  }

  ngOnDestroy() {
    this.intervalSubscriptiongetUserRepo.unsubscribe();
    this.intervalSubscriptiongetContributorsById.unsubscribe();
  }


}
