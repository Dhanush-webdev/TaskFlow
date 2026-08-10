const express = require("express");
const app = express();
const PORT = 5000;
const router = express.Router();
const cors = require("cors");
const pool = require("./db");
const e = require("express");

//middleware
app.use(cors());
app.use(express.json());

//  ROUTES
// CREATING TODOS

app.post("/addingtodos", async(req, res) => {
    try{
        const {task, description} = req.body;
        const newtodo = await pool.query("INSERT INTO todos (task, description) VALUES ($1,$2) RETURNING *",[task,description]);
        res.send(newtodo.rows[0]);
    }catch(e){
       console.error(e);
    }
})

//GETTING ALL TODOS

app.get('/getalltodos', async (req, res) => {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.send(allTodos.rows);
})

//GETTING SINGLE TODOS
app.get('/gettingtodo/:id', async(req, res) => {
    try{

            const {id}= req.params;
            const singleTodo = await pool.query("SELECT * FROM todos WHERE todo_id = ($3) RETURNING * ",[id]);
            res.send(singleTodo.rows[0]);

    }catch (e){
        console.error(e);
    }
})

//DELETING TODOS


//EDITING TODOS




app.listen(PORT,()=>{
    console.log("Server started on port: " + PORT);
});