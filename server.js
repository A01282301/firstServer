const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const jsonParser = bodyParser.json()


app.use( morgan('dev')); //To define im on development, it will not be used on production

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
    let id = req.query.id; //Query
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
    let id = req.params.id; //Parameter
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


//body post
app.post('/api/create', jsonParser , (req, res) =>{
    console.log(req.body)
    let name = req.body.name;
    let id = req.body.id;

    if(!name || !id){
        res.statusMessage = "A parameter was not included";
        return res.status(406).end();
    }
    let flag = false;
    listOfStudents.forEach(element => {
        if(element.id === id){
            flag = true;
        }
    });
    let newStudent =  {name, id}; 
    if(flag){
      
        res.statusMessage = "The ID value already exists";
        return res.status(406).end();
    }else{
        listOfStudents.push(newStudent)
        return res.status(200).json({});
    }
    return res.status(200).json({});

} )

app.delete( '/api/remove' ,(req, res) =>{
    let id = req.query.id;

    if(!id){
        res.statusMessage = "ID to remove was not received";
        return res.status(406).end();
    }
  
    let remove = listOfStudents.find( (student) => {
        if(student.id === id){
           return true;
        }
    })

    if(remove<0){
        res.statusMessage = "Student not found";
        return res.status(400).end();
    }
    listOfStudents.splice(remove, 1);
    return res.status(204).end()
})

//Port configuration
app.listen( 8080, ()=>{
    console.log("This app is running on the http port")
})

// webpage to be run on:   http://localhost:8080
