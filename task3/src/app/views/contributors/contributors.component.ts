import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { ContributorsService } from "./../../Services/contributors.service";

import { ContributorsModel } from '../../models/ContributorsModel';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit, OnDestroy  {
  public contributorsModel: ContributorsModel;
  contributorsModelArray: ContributorsModel[] = [];
  _timeout: any = null;

  sortByContributors: boolean;
  sortByFollowers: boolean;
  sortByPublicRepo: boolean;
  sortBypublicGists: boolean;

  itemsLoadTotal: number;
  private intervalSubscriptionGetContributors: Subscription;
  private intervalSubscriptiongetContributorsById: Subscription;
  // pager object
  pager: any = {
    page: 1,
    perPage: 20
  };

  constructor(private contributorsService: ContributorsService) {
    this.sortByFollowers = false;
    this.sortByPublicRepo = false;
    this.sortBypublicGists = false;
    this.itemsLoadTotal = 0;
  }

  ngOnInit() {
    this.loadContributors();

  }

  loadContributors(): void {
    this.intervalSubscriptionGetContributors = this.contributorsService.getContributors(this.pager.page, this.pager.perPage).subscribe((ContributorsModel) => {
      ContributorsModel.forEach(element => {
        this.contributorsModelArray.push(element);
      });
      this.itemsLoadTotal += ContributorsModel.length;
      this.setFollowersSortForContributor();

    });
  }

  setFollowersSortForContributor() {
    this.contributorsModelArray.forEach(con => {
      this.intervalSubscriptiongetContributorsById = this.contributorsService.getContributorsById(con.login).subscribe((ContributorsModel) => {

        con.followers = ContributorsModel.followers;
        con.public_repos = ContributorsModel.public_repos;
        con.public_gists = ContributorsModel.public_gists;
        con.name = ContributorsModel.name;

        this.Sort();
      });

    });

  }
  SortByContributors() {
    this.sortByFollowers = false;
    this.sortByPublicRepo = false;
    this.sortBypublicGists = false;
    this.contributorsModelArray.sort(function (obj1, obj2) {
      return obj2.contributions - obj1.contributions;
    });
  }
  SortByFollowers() {
    this.sortByFollowers = true;
    this.sortByPublicRepo = false;
    this.sortBypublicGists = false;
    this.contributorsModelArray.sort(function (obj1, obj2) {
      return obj2.followers - obj1.followers;
    });
  }
  SortByPublicRepo() {
    this.sortByFollowers = false;
    this.sortByPublicRepo = true;
    this.sortBypublicGists = false;
    this.contributorsModelArray.sort(function (obj1, obj2) {
      return obj2.public_repos - obj1.public_repos;
    });
  }
  SortBypublicGists() {
    this.sortByFollowers = false;
    this.sortByPublicRepo = false;
    this.sortBypublicGists = true;
    this.contributorsModelArray.sort(function (obj1, obj2) {
      return obj2.public_gists - obj1.public_gists;
    });
  }

  Sort() {
    if (this.sortByFollowers == true) {
      this.SortByFollowers();
    } else
      if (this.sortByPublicRepo == true) {
        this.SortByPublicRepo();
      } else
        if (this.sortBypublicGists == true) {
          this.SortBypublicGists();
        } else {
          this.SortByContributors();
        }
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.pager.page++;
        this.loadContributors();
        //console.log("load next page");
      }

    }, 500);
  }
  LoadMoreData() {
    this.pager.page++;
    this.loadContributors();
  }

  ngOnDestroy() {
    this.intervalSubscriptionGetContributors.unsubscribe();
    this.intervalSubscriptiongetContributorsById.unsubscribe();
  }


}
