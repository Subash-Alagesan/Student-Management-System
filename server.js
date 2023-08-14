const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
 


const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "student",

});

connection.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

  server.listen(3036,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }

    else 
    {
        console.log("Started....!!!! 3036");

    }
});

server.post("/api/student", (req, res) => {
  let details = {
    studentid: req.body.studentid,
    studentname: req.body.studentname,
    fathername: req.body.fathername,
    age: req.body.age,
    mobileno: req.body.mobileno,
    address: req.body.address,
  };
  let sql = "INSERT INTO studentdetails SET ?";
  connection.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student created Failed" });
    } else {
      res.send({ status: true, message: "Student created successfully" });
    }
  });
});

server.get("/api/student/allstudents", (req, res) => {
  var sql = "SELECT * FROM studentdetails";
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB" + error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


server.get("/api/student/:studentid", (req, res) => {
  var studentid = req.params.studentid;
  var sql = "SELECT * FROM studentdetails WHERE studentid=" + studentid;
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB" + error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});



server.get("/api/student", (req, res) => {
  const age = req.query.age ; 
  var sql = `SELECT * FROM studentdetails WHERE age = ${age}`;
  
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
      res.status(500).send({ status: false, error: "Database error" });
    } else {
      res.send({ status: true, data: result });
    }
  });
});




