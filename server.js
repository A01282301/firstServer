const express = require('express');
const app = express();

//Data of students
let listOfStudents = [
    {
        name: "Marcel",
        id: "A0128200"
    },
    {
        name: "Greg",
        id: "A01282393"
    },
    {
        name: "Jose",
        id: "A02282393"
    },
    {
        name: "Valerio",
        id: "A11111111"
    }
]



//Generic get Endpoint 
app.get('/api/students', (req, res) =>{
    console.log('getting all students')
    return res.status(200).json(listOfStudents);
} )

//Port configuration
app.listen( 8080, ()=>{
    console.log("This app is running on the http port")

})

// webpage to be run on:   http://localhost:8080
