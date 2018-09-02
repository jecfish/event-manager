# Event Manager

Event Management PWA (Angular, Firebase, Google Sheets) - Used by the organizing + event team during Google IO Extended KL 2018 (https://events.gdgkl.org/io/) to manage 400+ people check-in, badge collection, goodies distribution, survey & lucky draw entitlement.

Partial demo here: https://event-manager-d1559.firebaseapp.com/ (no sign up and admin feature)

**Features (general)**
- Signup (No rights assigned to user during signup, admin need to assign)

**Features (for volunteer) - bottom menu**
- Search attendee (SEARCH)
- Check-in & badge distribution management - Single / Pair Mode (CHECK-IN, BADGE)
- Goodies distribtuion (SHIRT)
- Check if attendee complete survey to get Lucky Draw entry (LUCKY)

**Features (for admin) - home page menu**
- Live event status update (DASHBOARD)
- Bulk loading attendee list (LOAD)
- Manage user access rights (RIGHTS)

# Settings

This project use Firebase Auth, Firestore, Google Sheets API.

**Firebase**
1. Register Firebase: https://firebase.google.com/
2. Create a new Firebase project(s). (You may create 2 projects, 1 for development, 1 for production)
3. Setup Authentication Sign In Method - Email / Password
4. Enable Firestore as `test mode`. (Update to non test mode when deploy to production)
5. Install firebase npm tools `npm install -g firebase-tools` globally in your machine.
6. In the project, run command `firebase init hosting` to setup hosting info. public folder name should be `dist/event-manager`, single page application should be `y`. Refer to `firebase.json` file.


**Google Sheet API**
1. Login to Google Cloud console: https://console.cloud.google.com/ (use the same email as Firebase)
2. Search for Sheets API, enable it
3. Create a Google Sheet like this one https://docs.google.com/spreadsheets/d/10U15rDEBWaDacqGfZyS4AOvmmLxAGzwqynawuSB2jbw. (sheet name should be *survey*, column B contains *id*)
4. Set the sheet permission to *anyone with the link can view*.

# Project config & setup
There are a couple of config you need to update, wild search for `todo` in the project to find them, or follow instruction below:

1. Replace Firebase web config in this project `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your firebase config.
2. Replace Google sheet config in this project:
    - `id` is the google sheet id, extract from the google sheet url (e.g. https://docs.google.com/spreadsheets/d/<copy_this_sheet_id>/edit)
    - `apiKey` is the same as firebase api key
3. When running project for first time, go to `signup` page, enter your email and password, and tick on all checkbox to create first admin user.
4. Once created first admin user, disabled `setupMode` in `src/environments/environment.ts` (Set to `false`). Enable setup mode is dangerous (when `setupMode` is enabled, user can select access rights during signup).
5. Load attendee list by navigate to LOAD page. Refer to instruction in this google sheet `data` tab (https://docs.google.com/spreadsheets/d/10U15rDEBWaDacqGfZyS4AOvmmLxAGzwqynawuSB2jbw)
6. Prepare a survey result google sheet for lucky draw entitlement. Refer to instruction in this google sheet `survey` tab (https://docs.google.com/spreadsheets/d/10U15rDEBWaDacqGfZyS4AOvmmLxAGzwqynawuSB2jbw)
7. Go to `dashboard` page, set total number of attendees. Once set, charts will display.

# Run the project

1. Run `yarn` or `npm install` to install dependencies.
2. Run `yarn start` or `npm start` to run the project in http://localhost:4200
3. Run `yarn build --prod` or `npm run build --prod` to build project - artifact in `dist` folder
4. Run `yarn deploy` or `npm run deploy` to deploy to firebase

# Other info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)
