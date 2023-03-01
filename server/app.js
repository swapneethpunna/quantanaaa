const Task = require('./models/Task');
const express = require('express');
const mongoose = require('mongoose');
const app = express()
mongoose.set('strictQuery', true);
app.use(express.json())
const port = 5000;

// Create Movie

const createUser = async (req,res)=>{
    try{
        const tasks = await Task.create(req.body)
        res.json({tasks})
    }catch(error){
        res.json({error})
    }
 }

 const getAllTasks = async(req,res)=>{
    try{
       const tasks = await Task.find({});
       res.json({tasks}) 
    }catch(error){
        res.status(500).json({"Message": "Something went wrong while extracting the data from the database"})
    }
 }

 const deleteTask = async (req,res)=>{
     try{
       const {id: taskId} = req.params;
       const tasks =  await Task.deleteOne({id:taskId})
       console.log(tasks)
       if(!tasks){
           return res.status(404).json({"message":"No item found to delete"});
       }
       res.status(200).json({"Success":"Deleted successfully"})
     }catch(error){
         res.status(500).json({"msg":"sonmething went wrong"});
     }
 }


// Routes

app.get('/getAllMovies', getAllTasks)

app.post('/addNewMovie', createUser)

// app.patch('/editMovie/:id', updateTask)

app.delete('/deleteMovie', deleteTask)


//connecting to the database
// pass // b1bjAkJtrOrPI1LY
mongoose.connect("mongodb+srv://swapneeth:b1bjAkJtrOrPI1LY@postass.bcc0r5m.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(app.listen(port, ()=>console.log("Connected!!")))
.catch(error=>console.log(error))