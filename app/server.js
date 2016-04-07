//Basic implementation of solving the challenge/tests
//Please use "BEGIN_CHALLENGE" and "END_CHALLENGE" like following to hide code from users/applicants
//Following is implemented to just check whether the tests work fine or not
//BEGIN_CHALLENGE
var express = require('express'),
  app = express(),
  apiRoutes = express.Router(),
  knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './sql/db.sqlite' },
    useNullAsDefault: true
  }),
  bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(9000, function(){
  console.log("server started ...");

  //Testing database
  knex.select('*').from('users')
  .then(function select (users) {
    var user = users.map(function (row) {
      console.log("user"  + row.id + ": " + row.first_name + " " + row.last_name);
    });
  });
});

apiRoutes.post('/users', function (req, res, next) {

  var height, weight, birthday, healthCardId;
  height = req.body.height ? req.body.height : null;
  weight = req.body.weight ? req.body.weight : null;
  birthday = req.body.birthday ? req.body.birthday : null;
  healthCardId = null;

  knex('users').insert({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, birthday: req.body.birthday, height: height, weight: weight, sex: req.body.sex, contact_number: req.body.contact_number, address: req.body.address, created_at: new Date()})
    .then(function() {
      return res.status(200).send({
        "code": 200
      });
    }).catch(function(err) {
      return res.status(400).send({
        "code": 400
      });
    });
});

apiRoutes.get('/users/:id', function (req, res, next) { 

  knex('users').where('id', req.params.id)
    .then(function (row) {
      if(!row[0]) {
        return res.status(404).send({
          "code": 404
        });       
      }
      return res.status(200).send({
        "code": 200,
        "result": {
          "first_name": row[0].first_name,
          "last_name": row[0].last_name,
          "birthday": row[0].birthday,
          "sex": row[0].sex,
          "created_at": row[0].created_at          
        }
      });
    }).catch(function(err) {
      return res.status(400).send({
        "code": 400
      });   
    });
});

apiRoutes.delete('/users/:id', function (req, res, next) {

  knex('users').where('id', req.params.id).del()
    .then(function(id) {
      if(id === 0) {
       return res.status(404).send({
          "code": 404
        });   
      }
      return res.status(200).send({
        "code": 200
      });
    }).catch(function(err) {
      return res.status(400).send({
        "code": 400
      }); 
    });
});

app.use('/api', apiRoutes);

//END_CHALLENGE