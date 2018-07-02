// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //https://developer.github.com/v3/? INFO API
  
  urpApiRootEndpoint : "https://api.github.com/",

  //urlApiGetAllContributors: "https://api.github.com/repos/angular/angular/contributors", 
  //urlApiGetContributor: "https://api.github.com/users/",  //login ex:vicb
  //urlApiGetListContributorForRepo: "https://api.github.com/repos/"
  
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
