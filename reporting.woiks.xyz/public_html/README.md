# CSE135
domain site: woiks.xyz
reporting website: https://reporting.woiks.xyz

## Project description
This project is built using Node.js + Express.js due to its ease in development. We use mongodb for this project as both of us are interested in exploring more into mongodb. We are hosting it on Atlas.

## Grader Accounts
### Admin
Username: admin
Email: admin@ucsd.edu
Password: Aiueo123!

### Non-Admin
Username: nonadmin
Email: nonadmin@ucsd.edu
Password: Aiueo123!

## Authentication
For authentication, we explored various methods of doing it. We first made the necessary endpoints in the gateway folder and set up the structure of the project to seperate gateway, service and database operations for beter debugging.

For logging in, we explored passport.js but decided to do the old fashion way by hashing password and creating session data manually because we think passport.js is an overkill for this project. We used the 'express-session' middleware to make it easier to manage sessions. The sessions data is will be stored locally in the server (No db involves). 
