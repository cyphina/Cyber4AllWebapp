1. Figure out the purpose of all the different frameworks.
    -I don't have modern web development experience, nor have I ever extensively worked on the frontend of a web application.
    -Reading about REST applications:
        -Since there is a limited amount of time, didn't try to go in depth about the topic.  I saw that the  technical details of a REST application would be hidden when using express framework, 
        so I just moved onto learning about using the framework.
    -Read a little about Express, Angular, Node, Docker, and Mongoose.
2. Setup the project and see how to use what things are given
    -Install everything
    -Examining the configuration files
    -Test out the database application
    -Brushed up on modern javascript and read a little bit about typescript to understand the given controller and how to build off of app.ts
3. Start trying out the things inside tutorials about creating an API using Express
    -After trying things in various tutorials, I decided to take a closer look at the source code given.  
    -Eventually after reading about some of the asynchronous features in javascript, I figured out how to integrate things I learned in the tutorial with the code already given in app.ts
4. Implementing the requirements in the backend
    -Pretty straightforward since I've done some work on application backends before, except for the fact that I'm not the greatest at typescript
    -Tested the functionality as I went using Postman
    -Ran into a few bugs
        -Ran into a small issue with the controller update function.  The parameter passed to updateOne() inside updateTask() should be an object without an id field.  
        -Other bugs were just my own mistakes like writing the wrong ids when testing out my API
    