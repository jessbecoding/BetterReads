# BetterReads

## About

BetterReads is a socail networking site where authors can reach their readers by hosting events. It was created by Jayelon Lasseigne and myself for our Backend Project at DigitalCrafts Fullstack Web Dev course. Jaye set up the frontend, I set up the backend. We met in the middle and made our logic work together.

The database uses ElephantSQL, I used JavaScript to write the backendlogic. Our frontend features custom CSS as well as Tailwind. We also used JavaScript for the frontend logic.

## Challenges

We really didn't run into any big hurdles while making this app. We did start off the project with a merge conflict (we were both trying to update the same file). I'm thankful it happened so early on because I think it helped us avoid any major conflicts as we moved forward. We did run into another merge conflict due to us both installing and trying to merge those changes at the same time. Luckily, it just took a little reading and a couple of curly brackets to fix. We ran into a minor problem getting the a tags to route correctly, it turned out to be a missing route.

## How We Did It

### Installations

At the topmost level of this repo, I installed bcrypt, cookie-parser, express, express-session, and postgres. Then I created a sequelize folder where I installed sequelize and and sequelize-cli.

### Starting the Server

I started by running `npm int` at the top level of the repo. This created the package.json file. From there I installed bcrypt, cookie-parser, express, express-session, pg, sequelize, and sequelize-cli. In my index.js file, I required all of those packages and defined the Port. From there, I ran the nodemon command to confirm the computer was listening.

### The Database

The database utilizes ElephantSQL's Tiny Turtle (free) plan. I used sequelize to create the Readers, Authors, Events, and Reader_Events models & migrations. Jaye and I worked together on hammering out the relationships, which was challenging as we were working with more tables in our project than what we were used to during in-class examples. To make sure our relationships were defined properly, I seeded some data. Everything went off without a hitch.

### The Routes

The routes we used were very simple, following the CRUD example (Create, Read, Update, Destroy). We wanted to be able to do these routes for author and reader accounts, as well as a page where authors can use those tools for events.

### The Session

## Styling
