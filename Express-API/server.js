var express = require('express')
var cors = require('cors')
var app = express()
const mysql = require('mysql2');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const TOKEN_KEY="shffhsjfkh"

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'tour_database'
});


function verify (req,res,next){
   const token = req.headers.authorization
   if(!token)
   {
    res.send("no token")
  }
  else{
  try {
    let  verify = jwt.verify(token,TOKEN_KEY)
    
    if(!verify){
      
      res.send("error!!")
    }else{
      res.send(verify)
      next()
    }
  }catch (error) {
    res.send("error")
  }
}
}

app.get('/bisection', function (req, res, next) {
    // simple query
connection.query(
    'SELECT * FROM `bisection`',
    function(err, results, fields) {
    res.json(results)
    }
  );
})

app.get('/bisection/:id', function (req, res, next) {
const id=req.params.id;
connection.query(
    'SELECT * FROM `bisection` WHERE `id` = ?',
    [id],
    function(err, results,fields) {
      res.json(results)
    }
  );
})


app.post('/bisection',function (req, res, next) {
  connection.query(
      'INSERT INTO `bisection` ( `FX`, `XL`, `XR`) VALUES (?,?,?)',
      [req.body.FX,req.body.XL,req.body.XR],
      function(err, results, fields) {
      res.json(results)
      }
    );
})

app.post('/register', function (req, res, next) {
    connection.query(
        'INSERT INTO `user` (`user_id`, `password`) VALUES (?,?)',
        [req.body.user_id,req.body.password],
        function(err, results, fields) {
          let user_id=req.body.user_id
          let password=req.body.password
          let token = jwt.sign({user_id,password},TOKEN_KEY)
          console.log(token)
          res.send(token)
        }
      );
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})