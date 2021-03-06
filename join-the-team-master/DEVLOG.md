1. Figure out the purpose of all the different frameworks.
    -I don't have modern web development experience, nor have I ever extensively worked on the frontend of a web application.
    -Reading about REST applications:
        -Since there is a limited amount of time, didn't try to go in depth about the topic.  I saw that the technical details of a REST application would be hidden when using express framework, 
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
    -When everything finally suddenly clicked about how to create the backend from the code given, I stopped reading any full guides on what was asked for.

4. Implementing the requirements in the backend
    -Pretty straightforward since I've done some work on application backends before, except for the fact that I'm not the greatest at typescript
    -Tested the functionality as I went by creating a request in Postman for every requirement
    -Ran into a few bugs
        -Ran into a small issue with the controller update function.  The parameter passed to updateOne() inside updateTask() should be an object without an id field.  
        -Other bugs were just my own mistakes like writing the wrong ids when testing out my API
5. Followed the tutorial on AngularJS

6. Problem with cross-origin resource sharing - Solved by reading online about how to fix this issue when using ExpressJS.  

7. Issue sending an array in the get request to sort.  It took me a while to find out because there could be other errors leading to the problem, but eventually after double checking my code the only problem
that could lead to this issue had to be some kind of formatting problem.
    -Fixed using JSON.stringify on the array object.  

8. Ran into a lot of issues that were of my own negligence:
    When programming the radiobutton, I passed in the wrong parameter to the function I was calling.  I thought I called the wrong DOM event and that (check) didn't work, so I kept looking up the right DOM event and testing out different methodologies to different problems I found online.
    I had a random comma in my html element and I got this weird error which I found various solutions for online.  I later found the extra comma.
    I had been trying to reference {{task.text}} from when I looped over the task objects in my category object, and I forgot that I only stored the ids in category not the actual tasks. 
    Lots of more errors like this...  I would document them all but it's just me being unfamiliar with typescript and me being unfamiliar with full stack development.

9. There was also a problem with the removeTasksFromCategory.  I found the problem when looking up the various array update operators.  I saw on the page about $each that it was used with push and something else.  The exception message was vague so I assumed I couldn't use it will the $pull operation that was there by default, so I looked on the $pull page to figure out how to rewrite the query

10. Making the application look better.  I just asked my friend who knows how to style websites and he taught me how to use a stylesheet and some conventions used to style.  Then I went on styling everything while asking him if he liked how it looked.  I ran into a lot of problems laying things out.  I know there's some frameworks to help you with that like bootstrap, but I am a bit pressed for time since I have other things to do as well this week.

11. Finally I decided to fix everything up according to some tutorials I'm reading at the end.  I didn't follow any of the start-to-end tutorials during the process, but I'm reading them again now to see if there's a good way to organize the folder structure.  I'm also seeing in the tutorials that I should've probably organized my routes differently, like using some route parameters.  It's not to hard to implement so I can fix that myself now.

Overall if I were to do this as real-world project I would probably ask to elaborate on the requirements at the start and improve the error checking.  I could also do this a lot faster since I know the steps now, although if I am going to be doing this more, I would read up on the technical details more.  I would probably and keep the integrity of the database in check by making sure if I deleted some task, I would also remove them in the categories referencing them.  

