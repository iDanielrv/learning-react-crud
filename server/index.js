const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "employeesystem"
});

app.post("/create", (req, res) => {
  const name = req.body.name; // "REQUERIR" alguma coisa do front end
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  ); // inserir coisas em nosso Banco de Dados
});

app.get('/employees', (req,res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  }) // esse é uma linha do MySql, "selecionar TUDO de employees"
})


app.listen(3001, function () {
  console.log("Yey, server is running on port 3001");
});
