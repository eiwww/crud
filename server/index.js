const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
 
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ket123456",
    database: "employeeSystem",
})

app.get('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("select * from account where name = ? and password = ?",[username,password],(err,result) => {
        if(err){
            console.log(err);
        }else{
            if(result){
                res.send(result);
            }else{
                res.send({ message: "Wrong Username or Password"});
            }
            
        }
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    db.query("INSERT INTO employee (name,age,country,position,wage) values(?,?,?,?,?)",[name,age,country,position,wage],(err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log("Values Inserted")
        }
    })
})

app.get('/employee', (req,res) => {
    db.query("select * from employee", (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put('/update', (req,res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("update employee set wage = ? where id = ?", [wage,id], (err,result) => {
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("delete from employee where id=?", id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
})

app.listen('3001', () => {
    console.log('Server is running on port 3001');
});