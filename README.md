
# E-Library

E-Library formerly known as Online Ebook Learning, is a web based online platform  education  institutes.

This platform allows the teachers to upload any document/books/resources that they want to share with the students. The administrator had to approve these uploads. After approval the students will be able to view the available resources and can read them. 

## Tech

**Server:** NodeJS

**Framework** ExpressJs

**Database** MySQL


  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
EMAIL="admin@oel"
PASS="12345"

OUTMAIL= # email for outgoing mail
OUTPASS= # password for outgoing mail

OUTAPPPASS= # app pass by google
```


  
## Installation

Clone the project


Go to the server directory
```
cd E-Library
```

Create the database using the sql file

Run the API
```
node server.js
```
  
## Features

**Homepage**

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-00-36.png" width="400" > </img>

***Users can do the following:***

- Create an account, login or logout


<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-01-57.png" width="400" > </img>
<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-01-10.png" width="400" > </img>

- Browse available books added by the teaher

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/screencapture-localhost-3000-student-2022-12-24-16_05_19.png" width="400" > </img>

- Read available book

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-06-19.png" width="400" > </img>

- The profile contains all the books a user has read

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/screencapture-localhost-3000-student-profile-2022-12-24-16_05_45.png" width="400" > </img>

-- Forget Passord for both student & teacher

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-12-40.png" width="400" > </img>

***Teacher can do the following:***

- Login or logout 

- Add new book

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/screencapture-localhost-3000-teacher-profile-2022-12-24-16_07_14.png" width="400" > </img>

  

***Admins can do the following:***

- View all the books stored in the database.

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-11-48.png" width="400" > </img>

- Approve/Decline Books

<img src="https://github.com/sparsh-18/E-Library/blob/master/screenshots/Screenshot%20from%202022-12-24%2016-12-20.png" width="400" > </img>
