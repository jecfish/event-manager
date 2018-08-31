// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'todo_your_api_key',
    authDomain: 'todo_your_domain.firebaseapp.com',
    databaseURL: 'https://todo_your_url.firebaseio.com',
    projectId: 'todo_your_project'
  },
  sheet: {
    baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets',
    id: 'todo_your_sheet_id',
    apiKey: 'todo_your_sheet_api_key'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
