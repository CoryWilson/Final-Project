<a href="https://codeclimate.com/github/CoryWilson/Final-Project"><img src="https://codeclimate.com/github/CoryWilson/Final-Project/badges/gpa.svg" /></a>

#Welcome to Showdown Sports!

Showdown Sports is the Final Project of [Cory Wilson](https://github.com/CoryWilson), a Student of the Web Design and Development Bachelors at Full Sail University. This project represents the culmination of three months worth of work.

The Application was developed as a sports pick 'em game that allows users to pick on multiple sports in a weekly showdown.

##View application online.
[Showdown Sports](http://mysterious-bayou-8903.herokuapp.com/)

##Run the application locally.
###Follow these steps:

`git clone https://github.com/CoryWilson/Final-Project.git`

`cd into diretory`

`npm install`

* Will require API Key from https://profootballapi.com/ stored as environmental variable NFL_API_KEY
* Will require environmental variables from a Facebook Application:
  * FB_CLIENT_ID
  * FB_CLIENT_SECRET
  * FB_CALLBACK_URL @ http://localhost:3000/auth/facebook/callback
* Will require MYSQL DB connection stored as environmental variable DB_URL
* Will require Express Session secrete stored as environmental variable EXPRESS_SECRET

`node app.js`

##Questions and/or Comments?
Send them to [ctwilson08@gmail.com](mailto://ctwilson08@gmail.com).
