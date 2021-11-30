const express = require('express');
var app = express();
var cors = require('cors');
const list = require('./models/List');
const user = require('./models/User');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


var server = require("http").createServer(app);
const port = process.env.PORT || 3001;

app.use(cors())

app.post('/api/register', async function (req, res) {
    console.log(req.query);
    try {
        const result = await user.Register(req.query);
        if (result != false) {
            console.log(result)
            res.json(result);
        }
        res.send("error during register");
    } catch (error) {
        return console.log();
    }
})


app.post('/api/login', async function (req, res) {
    console.log(req.query);
    try {
        const result = await user.Login(req.query);
        if (result != false) {
            console.log(result)
            res.json(result);
        }
        res.send(false);
    } catch (error) {
        return console.log();
    }
})

app.get('/api/lists', async function (req, res) {
    console.log(req.query);
    try {
        const result = await list.getAllLists(req.query);
        if (result != false) {
           
            /*const documents = {};
            result.forEach(doc => {
                documents[doc.id] = doc.data();
            });*/
            console.log(result)
            res.json(result);
        }
        res.send("error during get lists");
    } catch (error) {
        return console.log();
    }
})

app.post('/api/lists', async function (req, res) {
    console.log(req.query);
    try {
        const result = await list.addList(req.query);
        if (result != false) {
            res.sendStatus(200);
        }
        res.send("error during add new list");
    } catch (error) {
        return console.log();
    } 
})

app.post('/api/tasks', async function (req, res) {
    console.log(req.query);
    try {
        const result = await list.addTask(req.query);
        if (result != false) {
            res.sendStatus(200);
        }
        res.send("error during add new task to the list");
    } catch (error) {
        return console.log();
    } 
})

app.delete('/api/tasks', async function (req, res) {
    console.log(req.query)
    try {
        const result = await list.deleteTask(req.query);
        if (result != false) {
            console.log('correct deletion')
            res.sendStatus(200);
        }
        res.send("error during delete task from the list");
    } catch (error) {
        return console.log();
    } 
})

app.put('/api/tasks', async function (req, res) {
    console.log(req.query)
    try {
        const result = await list.markTaskDone(req.query);
        if (result != false) {
            res.sendStatus(200);
        }
        res.send("error during update task");
    } catch (error) {
        return console.log();
    } 
})
app.listen(port);
console.log('Server started at http://localhost:' + port);
