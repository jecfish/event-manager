# Event Manager

Event Management PWA App (Angular, Firebase, Google Sheets) - Used in IOxKL 2018 (https://events.gdgkl.org/io/)

**Features (for volunteer)**
- Search attendee (SEARCH)
- Check-in & badge distribution management - Single / Pair Mode (CHECK-IN, BADGE)
- Goodies distribtuion (SHIRT)
- Check if attendee complete survey to get Lucky Draw entry (LUCKY)

**Features (for admin)**
- Live event status update (DASHBOARD)
- Bulk loading attendee list (LOAD)
- Create new user (GRANT)
- Manage user access (RIGHTS)

# Settings

This project use Firebase Auth, Firestore, Google Sheets API.

**Firebase**
1. Register Firebase: https://firebase.google.com/
2. Create a new Firebase project. (You may create 2 projects, 1 for development, 1 for production)
3. Replace the Firebase web config in this project `src/environments/environment.ts` and `src/environments/environment.prod.ts`

**Google Sheet API**
4. Login to Google Cloud console: https://console.cloud.google.com/ (use the same email as Firebase)
5. Select 

# Run the project

1. Run `yarn` or `npm install` to install dependencies.
2. Run `yarn start` or `npm start` to run the project in http://localhost:4200
3. Run `yarn build --prod` or `npm run build --prod` to build project - artifact in `dist` folder
4. Run `yarn deploy` or `npm run deploy` to deploy to firebase

# Other info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.
