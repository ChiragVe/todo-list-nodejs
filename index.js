const express = require('express');
require('dotenv').config();
const task = require('./models/todoTask');
const res = require('express/lib/response');
require('./dbconnection');


const app = express();
app.set('view engine', 'ejs');
app.use('/views', express.static('views'));
app.use(express.urlencoded({ extended: true }));

//GET method
app.get('/', (_req, resp) => {
    task.find({}, (_err, todo) => {
        resp.render('todo.ejs', { task: todo });
    });
});

//Getting the task and saving it to the database
app.post('/', async (req, resp) => {
    const todotask = new task({
        content: req.body.content
    })

    try {
        await todotask.save();
        resp.redirect("/");
    } catch (err) {
        resp.redirect("/");
    }

});

//Updating the tasks
app.get('/edit/:id', (req, resp) => {
    const id = req.params.id;
    task.find({}, (_err, tasks) => {
        resp.render('todoedit.ejs', { todotask: tasks, idTask: id });
    });
});

app.post('/edit/:id', (req, resp) => {
    const id = req.params.id;
    task.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) {
            resp.send(500, err)
        }
        else {
            resp.redirect('/');
        }
    });
});


app.route('/remove/:id').get((req, resp) => {
    const id = req.params.id;
    task.findByIdAndRemove(id, { content: req.body.content }, err => {
        if (err) {
            resp.send(500, err)
        }
        else {
            resp.redirect('/');
        }
    });
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});