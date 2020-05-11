const express = require('express');
const app = express();

//Data of students
let listOfStudents = [
    {
        name: "Marcel",
        id: "1"
    },
    {
        name: "Greg",
        id: "2"
    },
    {
        name: "Jose",
        id: "3"
    },
    {
        name: "Valerio",
        id: "4"
    }
]



//Generic get Endpoint 
app.get('/api/students', (req, res) =>{
    console.log('getting all students')
    return res.status(200).json(listOfStudents);
} )

//Get a student only one id send as a query
app.get('/api/studentID', (req, res) =>{
    console.log('getting student by id')
    let id = req.query.id;
    if(!id){
        res.statusMessage ='No id was provided';
       return res.status(406).end();
    }
    let result = listOfStudents.find( (student)  => {
        if(student.id == id){
            return student;
        }
    })
    if(!result){
        res.statusMessage =`Student not found`;
       return res.status(404).end();
    }

    return res.status(200).json(result);
} )

//Send as a link KEEP IN MIND THAT YOU ONLY CHANGED ONE LINE
app.get('/api/studentID/:id', (req, res) =>{
    console.log('getting student by id')
    let id = req.params.id;
    if(!id){
        res.statusMessage ='No id was provided';
       return res.status(406).end();
    }
    let result = listOfStudents.find( (student)  => {
        if(student.id == id){
            return student;
        }
    })
    if(!result){
        res.statusMessage =`Student not found`;
       return res.status(404).end();
    }

    return res.status(200).json(result);
} )

//Port configuration
app.listen( 8080, ()=>{
    console.log("This app is running on the http port")
})

// webpage to be run on:   http://localhost:8080
