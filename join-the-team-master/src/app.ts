import { MongoDriverFactory } from "./MongoConnectorFactory";
import { MongoDriver } from './MongoConnector';
import * as bodyParser from 'body-parser'
import * as express from "../node_modules/express/lib/express"
import * as path from "path"

var dbController = MongoDriverFactory.build()
    .then(async (datastore) => {

        const PORT = 3000;
        const app = express();

        app.use(bodyParser.json())
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use('/', express.static(path.join(__dirname, '../public'), { redirect: false }));

        app.get('/listTask', async (req, res) => {
            if (req.query._id) {
                try {
                    let id = req.query._id
                    let task = await datastore.readTask(req.query._id)
                    if (task) {
                        res.send(task)
                    }
                    else
                        throw ("No objects found with ID " + req.query._id)
                }
                catch (e) {
                    res.send({})
                    console.log(e)
                }
            }
            else {
                console.log("Empty _id field")
                res.send({})
            }
        })

        app.get('/listTasks', async (req, res) => {

            let taskList = []
            let sortObject = {}
            if (req.query.sortFields && req.query.sortDirection) {
                try {
                    let sortFields = JSON.parse(req.query.sortFields) || []

                    for (let i = 0; i < sortFields.length; ++i) {
                        if (sortFields[i]) {
                            sortObject[sortFields[i]] = parseInt(req.query.sortDirection) || -1
                        }
                    }
                    taskList = await datastore.listTasks(sortObject)

                    res.status(200).send(taskList)
                }
                catch (e) {
                    console.log(e)
                }
            }
            else {
                try {
                    taskList = await datastore.listTasks(sortObject)
                    res.status(200).send(taskList)
                }
                catch (e) {
                    console.log(e)
                }
            }
        })

        //As a user, I should be able to create a task
        app.post('/createTask', async (req, res) => {
            try {
                let newTask = { text: req.body.text, completed: req.body.completed, date: new Date() }
                let createRes = await datastore.createTask(newTask)
                res.send(newTask)
            }
            catch (e) {
                res.send("Failed to create task")
                console.log(e)
            }
        })

        //As a user, I should be able to rename a task
        app.put('/renameTask', async (req, res) => {
            try {
                let foundTask = await datastore.readTask(req.body._id)
                if (foundTask) {
                    let updateRes = await datastore.updateTask(req.body._id, { text: req.body.text })
                    res.send(foundTask)
                }
                else
                    throw "No task with ID " + req.body._id + " found."
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to mark a task as complete
        app.put('/completeTask', async (req, res) => {
            try {
                let foundTask = await datastore.readTask(req.body._id)
                if (foundTask) {
                    let updateRes = await datastore.updateTask(req.body._id, { completed: req.body.completed })
                    res.send(foundTask)
                }
                else
                    throw "No task with ID " + req.body._id + " found."
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to delete a task.
        app.delete('/deleteTask', async (req, res) => {
            try {
                let foundTask = await datastore.readTask(req.query._id)
                if (foundTask) {
                    let deleteRes = datastore.deleteTask(req.query._id)
                    res.send(foundTask)
                }
                else
                    throw "No task with ID " + req.query_id + " found."
            }
            catch (e) { //Invalid kind of ID (not convertible to ObjectID)
                res.send({})
                console.log(e)
            }
        })

        app.get('/getCategories', async (req, res) => {
            try {
                let categoryList = await datastore.listCategories()
                res.send(categoryList)
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to create a category
        app.post('/createCategory', async (req, res) => {
            try {
                let createRes = await datastore.createCategory(req.body.name)
                res.send({ _id: createRes, name: req.body.name, tasks: [] })
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to delete a category.
        app.delete('/deleteCategory', async (req, res) => {
            try {
                let foundTask = await datastore.readCategory(req.query._id)
                if (foundTask) {
                    let deleteRes = datastore.deleteCategory(req.query._id)
                    res.send(foundTask)
                }
                else
                    throw "No category with ID " + req.query_id + " found."
            }
            catch (e) { //Invalid kind of ID (not convertible to ObjectID)
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to rename a category.
        app.put('/renameCategory', async (req, res) => {
            try {
                let foundTask = await datastore.readCategory(req.body._id)
                if (foundTask) {
                    let updateRes = await datastore.updateCategory(req.body._id, req.body.name)
                    res.send(foundTask)
                }
                else
                    throw "No category with ID " + req.body._id + " found."
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to add a task to a category.
        app.put('/addTaskToCategory', async (req, res) => {
            try {
                let foundCategory = await datastore.readCategory(req.body._id)
                if (foundCategory) {
                    let updateRes = await datastore.addTasksToCategory(req.body._id, req.body.categories)
                    res.send(req.body.categories)
                }
                else
                    throw "No category with ID " + req.body._id + " found."
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        //As a user, I should be able to remove a task from a category.
        app.put('/removeTaskFromCategory', async (req, res) => {
            try {
                let foundCategory = await datastore.readCategory(req.body._id)
                if (foundCategory) {
                    let updateRes = await datastore.removeTasksFromCategory(req.body._id, req.body.categories)
                    res.send(req.body.categories)
                }
                else
                    throw "No category with ID " + req.body._id + " found."
            }
            catch (e) {
                res.send({})
                console.log(e)
            }
        })

        app.listen(PORT, () => {
            console.log('Express server listening on port ' + PORT);
        })

    })
    .catch(e => {
        console.log(e)

    });


