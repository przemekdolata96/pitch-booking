var express = require('express');
var router = express.Router();

const { User } = require('../sequalize');

//const checkJwt = require('../jwtConf')

/* GET users listing. */
router.get('/user/:id', (req, res, next) => {
  User.findAll({
    where: {
      id: decodeURIComponent(req.params.id)
    }
  })
  .then(result => {
    res.status(200).send(result);
  })
  .catch(() => {
    res.status(500).send('no users find');
  })
});

router.get('/users', (req, res, next) => {
  User.findAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send('no users find');
    })
});


router.post('/user', (req, res, next) => {
  User.findOrCreate(
    {   
      where: {id: req.body.id},
      defaults: {name: req.body.name}
    }
  )
  .then(() => {
    res.status(200).send('user added!');
  })
  .catch(() => {
    res.status(500).send('user is not added!');
  }) 
});

module.exports = router;
