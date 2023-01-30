# BetterReads

## About

BetterReads is an app where authors can reach their readers by hosting events. It was created by Jayelon Lasseigne and myself, Jessika Adams, for our Backend Project at DigitalCrafts Fullstack Web Dev course. Jaye set up the frontend, I set up the backend. We met in the middle and made our logic work together.

The database uses ElephantSQL, I used JavaScript to write the backendlogic. Our frontend features custom CSS as well as Tailwind. We also used JavaScript for the frontend logic.

You can read more about the process of building this app <a href="https://medium.com/@jessbecoding/betterreads-487d30886de6">here</a> on Jessika's Medium, or <a href="#">here</a> for Jaye's.

## Challenges

The major challenge we faced during this project was scaling it. We tried to make a many to many relationship join table, but that proved too difficult for our time frame. We did start off the project with a merge conflict (we were both trying to update the same file). I'm thankful it happened so early on because I think it helped us avoid any major conflicts as we moved forward. We did run into a few more merge conflict due to us both installing and trying to merge those changes at the same time. Luckily, it just took a little reading and a couple of curly brackets to fix.

## How We Did It

### Installations

At the top-most level of this repo, I installed bcrypt, cookie-parser, express, express-session, connect-session-sequelize, and postgres. Then I created a sequelize folder where I installed sequelize and and sequelize-cli.

### Starting the Server

I started by running `npm int` at the top level of the repo. This created the package.json file. In my index.js file, I required all of those packages and defined the Port. From there, I ran the nodemon command to confirm the computer was listening.

### The Database

The database utilizes ElephantSQL's Tiny Turtle (free) plan. I used sequelize to create the Readers, Authors, Events, and Reader_Events models & migrations. Jaye and I worked together on hammering out the relationships, which was challenging as we were working with more tables in our project than what we were used to during in-class examples. To make sure our relationships were defined properly, I seeded some data. Everything went off without a hitch.

### The Routes

The routes we used were very simple, following the CRUD example (Create, Read, Update, Destroy). We wanted to be able to do these routes for author and reader accounts, as well as a page where authors can use those tools for events.

### The Session

The session is created during the login and stored in the database. The logout route kills the session. You are not able to navigate to protected routes without passing authentication.

## Styling

### Colors Used:

| Hex Code | Used For          |
| -------- | ----------------- |
| #7e49ba  | Main Purple       |
| #d796ff  | Accent Purple 1   |
| #4e2d74  | Accent Purple 2   |
| #f7dfff  | Background Purple |
| #140024  | Font Purple       |

I spent the whole first day of this project laying out what I wanted BetterReads to look like. Based off of past projects, I knew that doing this was crucial to my efficiency. I have a tendency to try to change all the styling at the last second and create more work for myself.

I chose purple because, based on the articles I read on color psychology, purple creates feelings of ‘luxury’, but also ‘curiosity’ and ‘mystery.’ I thought that was a good thing since our website is about discovering new authors and their books!

### Typefaces Used:

| Name and Link to Google Fonts                                                                      | Used For  |
| -------------------------------------------------------------------------------------------------- | --------- |
| [DM Serif Text](https://fonts.google.com/specimen/DM+Serif+Text?query=dm+ser&noto.query=Quicksand) | Headers   |
| [Quicksand](https://fonts.google.com/specimen/Quicksand?query=quick&noto.query=Quicksand)          | Body Text |

I also picked these fonts out the first day! I decided on a serif font for the headers because
