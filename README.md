# CFAPI


[![website](https://img.shields.io/badge/cpsave-Link%20To%20The%20website-red)](http://cpsave.herokuapp.com/)

## Highlights

Website built for purpose of analyzing problem solved by Contestant on codeforces.Saving Notes to problems and Separate Notes Page. Analyzing problems with submissions and their tags only.

Website built using Node.js for backend and html, jquery and css for frontend.

various Javascript frameworks like express, request, OAuth, Ajax, passport , ejs, mongodb, mongoose , mocha.


## Profile Page
- Page for Checking all Tags and no of questions solved for each tag.
- **OAuth** and **Passport** used for Login
- This page Fetches All details for Codeforces User using Codeforces **API**
- Store all the information in **Mongodb** database for fast access in future.
- Handle can be edited.

![](profile.gif)
```console
```
## User Notes
- Edit/Add notes To the Database
- **Ajax** Used to to send and receive requests asynchronously to the Database , Updating Css dynamically on success.

![](notes.gif)
``` console
```
## All problems page
- See all the solved problems and add notes to them
- add them to custom lists of your own.

![](allproblems.gif)
``` console
```
## Future Plans

1. ~~changing design of website, removing semantic ui framework~~ (DONE)
2. ~~create own topic lists and add problems to it~~ (DONE)
3. ~~ajax for saving notes to a problem~~ (DONE)
4. move to web scrapping instead of cf API
5. upcomming contests date
6. Implementation of dark mode
8. for small screen devices.



## Details

```
.
└── CFAPI/
    ├── config(hidden for security purpose)/
    │   ├── keys.js
    │   └── passport-setup.js
    ├── models /
    │   ├── usermodels.js
    │   └── test-usermodels.js
    ├── public/
    │   ├── scripts/
    │   │   ├── ajax.js
    │   │   ├── list.js
    │   │   ├── master.js
    │   │   └── usernotes.js
    │   └── stylesheets/
    │       ├── All of Css
    │       ├── app.css
    │       ├── userpage.css
    │       ├── .
    │       ├── .
    │       ├── .
    │       └── etc.
    ├── routes/
    │   ├── APIroutes.js
    │   ├── OauthRoutes.js
    │   ├── profile-routes.js
    │   ├── user-routes.js
    │   └── UserNotes.js
    ├── tests/
    │   └── apitodbtest.js
    ├── views/
    │   ├── partials/
    │   │   ├── header.ejs
    │   │   └── footer.ejs
    │   ├── index.ejs
    │   ├── userpage.ejs
    │   ├── usernotespage.ejs
    │   ├── .
    │   ├── .
    │   ├── .
    │   └── etc.
    └── app.js

```


**app.js** :

 Main file to be executed, 
 conatins code to:
 1. require packages like : express, request, mongoose, passport, body-parser.
 2. Create mongoose connection to the database at Atlas mongodb. 
    keys are imported from config folder.
 3. Route modules imports 
  
    ```/auth``` (Authentication routes)

    ```/profile``` (Profile routes)

    ```/usernote``` (User Notes routes)

    ```/edit``` (API routes)



**Routes:**
- UserNotes.js (User Notes Routes)
    - Auth check (if user is logged in or not)
    - GET,POST,DELETE routes for handling AJAX request made by the client and sending success or failure status

        - GET routes:
     
            ```/``` - fetches all stored notes for particular user and sends then rendered 	 HTML string to the client.
            
        - POST routes:
          
          ```/addnote```  - handles request to add a new note to the database and returns the note along with created id of the note.
            
          ```/editnote``` - handles request to edit an already existing note by modifying the database using note id.
            
        - DELETE routes:
            
           ```/deleteNote/:id``` - handles request to delete a note , here id of the node is specified by parameters in route


- API-Routes.js
    - GET Routes
   
        ```/``` - renders page that contains html form to post a route to change profile handle.

        ```/cfhandle``` - This in the part where code interacts with The API provided by the codefores, according to the handle user
                    has provided , this route sends a request to API which return the details of the user in JSON format.
                    The result is then parsed and stored in Mongodb database with the schema given under model section.
                    API returns whole set of submissions user has made, removing duplicates and updating verdicts is done here
                    The API is quite slow so database storage was needed.
                    
        ```/refresh``` - This Again makes request to API but this time instead of creating new user collection it only updates already 
                    existing user
    
- Profile-routes.js
    - GET,POST,DELETE routes for handling AJAX request made by the client and sending success or failure status
        This page handles the request made for adding custom lists and usermade tags for problems, User can add tags to solved problems
        for future reference. User can also add problems to custom lists



**Views:** 

 - EJS templating engine is used to render HTML and CSS , javascript and Dynamic contents.
        routes sends complete data of a user which is then rendered and used to serve page contents.
        The code is written well structured since new elements will be added as dynamic content by AJAX requests.

**Public:** 

   contains javascript for the page and css stylesheets 

   - Scripts: 
     - Usernote.js
  
        Contains AJAX code: (/addnote, /deletenote, /save-edit)
        - function to create html string to append to the page after a successful request is made by jquery using ajax.
        - AJAX functions:
    
           finding closest form element or other html element which triggered the 'click' event or 'submit' event.
                    serializing the form data to prepare it for sending it to server. the data is sent in the backend without page 
                    reload and the server process the data that is adding/editing/deleting and sends a response.
                    if response is evaluated to be true html string is created and appended to the page which also changes the css.
                    this also includes deletion of an element from the page.
     - list.js
              
          Ajax code for adding creating lists and adding solved problem to lists.

- (CSS) Stylesheets:
    
    - Css-grid system is used for creating grid for the webapp 
       
        css for svg animation in front page using keyframes to animate objects
            
        cards designed from scratch for notes and problems both
            
        sidenavbar and other buttons and styles were created using pure css, since usage of frameworks like bootstrap slows the 
            rendering and is not very much modifiable.
            
            

**Models:**

 - contains schemas for database
        userschema holds information for user like (Information from google authentication , codeforces handle, )
        
   each user has array of notes schema and problems schema which stores user created notes and solved problems respectively.
