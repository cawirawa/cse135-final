# CSE135
domain: woiks.xyz
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

## Note
We store all of our html files in the HTML folder for a better structure for the project.
The entry point to the server is from server.js. Then, the routing is located in the gateway folder.
The gateway will then call services from the service folder depending on the usecase of the endpoint.
Service will then call functions from the db folder if it needs to access the database.

## Authentication
For authentication, we explored various methods of doing it. We first made the necessary endpoints in the gateway folder and set up the structure of the project to seperate gateway, service and database operations for beter debugging.

For logging in, we explored passport.js but decided to do the old fashion way by hashing password and creating session data manually because we think passport.js is an overkill for this project. We used the 'express-session' middleware to make it easier to manage sessions. The sessions data is will be stored locally in the server's file system (No db involves). 


## Dashboard

We think that session length, load time, and user backgrounds are important in determining what the user is doing on our website. 
We originally had the first chart to be a line chart where it show the average load time, average session time, and average total idle time. However, we think that a line chart does not suit this usecase, so we decided to make it a bar chart as these data are unique per page and they are not continuous.
The reason that we think these information is important is because it shows how long typically a user open our webpages and how long typically user is idle on our web pages. 

The second chart that we have is the total number of visitors that visits our website per day in the last 30 days. We think that this is a really important aspect of web analytics as it shows at which time period that our website is being viewed most. We chose to display it in a line chart as we can compare how the visitor counts changes from day to day. For example, our visitor can be less during week days compared to the weekends and the chart can easily imply that. The reason that we decided to display this chart is because we think that the visitor counts is dependent on which time of the month. For example, our website visitors is a lot greater during the start of the month than the end of the month.

The third chart that we have is number of visits vs day of the week. We are dividing the way we display it into desktop users and mobile users. We chose this to be a bar chart as we think that it can be easily analyzed comparing the number of desktop visitors and the number of mobile visitors side by side per day of the week. The reason we chose to display this chart is because we think that there is a correlation of mobile users count compared to desktop users count during days of the week. For example, weekend users can use mobile more than weekday users.

The fourth chart that we have is a pie chart where we display the operating system used to access our website. The reason we use a pie chart is because we can easily visualize the majority of our user's operating system. We believe that user's operating system is related to user's background. For example, Linux users are tend to be developers compared to Macintosh users. 

The fifth chart that we have is also a pie chart where we display the languages that the user have in their devices. The reason we used a pie chart is also because we can see the majority of where our users come from. In our case, as the main users come from an English speaking country, it does not make a much of a difference. However, if we have a worldwide users, this can be really useful!

Lastly, we have a grid that shows the total page views per page and average time on the page in seconds. The reason we use grid is because it is easy to read as the row is unique per page. The reason we display this is because we see which page is viewed the longest and visited the most. We believe this is also useful as we know which pages users are more interested in and which pages users don't.

NOTE: the file name for the dashboard is 'dashboard.html' located in the html folder for a better project structure..

## Report
Our collectorjs collects alot of user activity such as user loadtime, entertime, lefttime and 3 arrays which contain clicks, scrolls and keyboard activity. 
For the first chart we displayed the same chart as the one in dashboard such that the user of the report could connect the main chart and the supporting chart better when it is in the same page. 
For the second chart, i created a bar chart which displays the activities of mouse clicks, scrolls and keyboard clicks. I chose as such as we can tell alot about what a user does in apage when we keep track of those data. A bar chart was chosen because we are to compare different pages, hence a non continuous data is better suited to a bar chart than a line chart. A bar chart can also contain multiple parameters within a category such as having three bars(clicks, scroll and keystrokes) for each page. This allows us to compare a page to another page, as well as different parameters of each page. By displaying three bars of different parameters, we can conclude better what type of user activity is done in which page.

While the data can contain many accidental user interactions, it can still tell alot about how the general user would use the website. Such as in the /php.html, we noticed that users scroll alot. When we look into the page, we indeed saw the the page was extremely long, hence users would need to scroll down to see the full content. Keeping track of scrolling allows us who use the dash to see which pages may be too long and can lead to updates to shorten those pages to allow users a better experience when looking for something as users would rarely scroll down too much. In lecture the professor has showned that in long pages,the bottom part is more rarely viewed, hence it is important to keep page length to a minimum. Clicking is an indicator of an interactive page, such as one with many buttons or links. As we have predicted, pages such as the homepage(/) has a rate of clickin close to 1 as users click the link and leap out of the page. Keyboard strokes can help with identifying pages which requires typing. While our website has no typing intensive page, it can identify user activity when we do. keycount can identify whether a user is often filling up a form or not. if a form page has low keystrokes, that would mean that users visited the page yet did not fill up the form. Causes of such incident can be that our form is messy and not userfriendly, which cause users to be unmotivated to fill up the form.

We then included a third component as a grid. the grid would contain the same information as the chart but it would be easier to view the numbers and compare them. Whereas in the chart, we can see the scale of the difference but not really the value, as we have to interact with the chart to view its values.

NOTE: the file name for our metric is 'session.html' located in the html folder for a better project structure.