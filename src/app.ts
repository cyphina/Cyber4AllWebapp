import { MongoDriverFactory } from "./MongoConnectorFactory";
import { MongoDriver } from './MongoConnector';
import * as bodyParser from 'body-parser'
import * as express from "../node_modules/express/lib/express"

var dbController = MongoDriverFactory.build()
  .then(async (datastore) => {

    const PORT = 3000;
    const app = express();

    app.use(bodyParser.json())

    app.get('/', async (req, res) => {

      let taskList = []
      let sortObject = {}
      let sortFields = JSON.parse(req.query.sortFields) || []

      try {
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
    })

//As a user, I should be able to create a task
app.post('/createTask', async (req, res) => {
  try {
    let createRes = await datastore.createTask({ text: req.body.text, completed: req.body.completed, date: new Date() })
    res.send("Successful task creation")
  }
  catch (e) {
    res.send("Failed to create task")
    console.log(e)
  }
})

//As a user, I should be able to create a task
app.put('/renameTask', async (req, res) => {
  try {
    let foundTask = await datastore.readTask(req.body._id)
    if (foundTask) {
      let updateRes = await datastore.updateTask(req.body._id, { text: req.body.text })
      res.send('Update with put!')
    }
    else
      throw "No task with ID " + req.body._id + " found."
  }
  catch (e) {
    res.send('Update failed!')
    console.log(e)
  }
})

//As a user, I should be able to mark a task as complete
app.put('/completeTask', async (req, res) => {
  try {
    let foundTask = await datastore.readTask(req.body._id)
    if (foundTask) {
      let updateRes = await datastore.updateTask(req.body._id, { completed: req.body.completed })
      res.send('Update with put!')
    }
    else
      throw "No task with ID " + req.body._id + " found."
  }
  catch (e) {
    res.send('Update failed!')
    console.log(e)
  }
})

//As a user, I should be able to delete a task.
app.delete('/deleteTask', async (req, res) => {
  try {
    let foundTask = await datastore.readTask(req.query._id)
    if (foundTask) {
      let deleteRes = datastore.deleteTask(req.query._id)
      res.send('Deleted task with id ' + req.query._id + ' successfully!')
    }
    else
      throw "No task with ID " + req.query_id + " found."
  }
  catch (e) { //Invalid kind of ID (not convertible to ObjectID)
    res.send('Delete failed for id + ' + req.query._id + '!')
    console.log(e)
  }
})

//As a user, I should be able to create a category
app.post('/createCategory', async (req, res) => {
  try {
    let createRes = await datastore.createCategory(req.body.name)
    res.send("Successful category creation")
  }
  catch (e) {
    res.send("Failed to create category")
    console.log(e)
  }
})

//As a user, I should be able to delete a category.
app.delete('/deleteCategory', async (req, res) => {
  try {
    let foundTask = await datastore.readCategory(req.query._id)
    if (foundTask) {
      let deleteRes = datastore.deleteCategory(req.query._id)
      res.send('Deleted category with id ' + req.query._id + ' successfully!')
    }
    else
      throw "No category with ID " + req.query_id + " found."
  }
  catch (e) { //Invalid kind of ID (not convertible to ObjectID)
    res.send('Delete failed for category with id + ' + req.query._id + '!')
    console.log(e)
  }
})

//As a user, I should be able to rename a category.
app.put('/renameCategory', async (req, res) => {
  try {
    let foundTask = await datastore.readCategory(req.body._id)
    if (foundTask) {
      let updateRes = await datastore.updateCategory(req.body._id, req.body.name)
      res.send('Update category with put!')
    }
    else
      throw "No category with ID " + req.body._id + " found."
  }
  catch (e) {
    res.send('Update failed!')
    console.log(e)
  }
})

//As a user, I should be able to add a task to a category.
app.put('/addTaskToCategory', async (req, res) => {
  try {
    let foundTask = await datastore.readCategory(req.body._id)
    if (foundTask) {
      let updateRes = await datastore.addTasksToCategory(req.body._id, req.body.categories)
      res.send('Update category with put!')
    }
    else
      throw "No category with ID " + req.body._id + " found."
  }
  catch (e) {
    res.send('Update failed!')
    console.log(e)
  }
})

//As a user, I should be able to remove a task from a category.
app.put('/removeTaskFromCategory', async (req, res) => {
  try {
    let foundTask = await datastore.readCategory(req.body._id)
    if (foundTask) {
      let updateRes = await datastore.removeTasksFromCategory(req.body._id, req.body.categories)
      res.send('Update category with put!')
    }
    else
      throw "No category with ID " + req.body._id + " found."
  }
  catch (e) {
    res.send('Update failed!')
    console.log(e)
  }
})

// As a user, I should be able to sort tasks by the date they were created.
app.get('/', async (req, res) => {
  let taskList = []
  try {
    taskList = await datastore.listTasks()
    res.status(200).send(taskList)
  }
  catch (e) {
    console.log(e)
  }
})

// As a user, I should be able to sort tasks by whether they are completed or not.
app.get('/', async (req, res) => {
  let taskList = []
  try {
    taskList = await datastore.listTasks()
    res.status(200).send(taskList)
  }
  catch (e) {
    console.log(e)
  }
})

app.listen(PORT, () => {
  console.log('Express server listening on port ' + PORT);
})

  })
  .catch (e => {
  console.log(e)

});


