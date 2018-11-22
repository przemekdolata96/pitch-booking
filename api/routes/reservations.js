const express = require('express');
const router = express.Router();
const { Reservation } = require('../sequalize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op


//const checkJwt = require('../jwtConf')
/* This route doesn't need authentication */
router.get('/reservations/:date/:pitchId', (req, res, next) => {
  Reservation.findAll({
    where: {
      date: req.params.date,
      pitchId: req.params.pitchId
    }
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send('no pitches find');
    })
});

router.get('/reservations/:userid', (req, res, next) => {
  Reservation.findAll({
    where: {
      userId: req.params.userid,
    }
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send('no pitches find');
    })
});

router.get('/reservations', (req, res, next) => {
  Reservation.findAll()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(() => {
      res.status(500).send('no pitches find');
    })
});

router.post('/reservation', (req, res, next) => {
  Reservation.findOne({
    where: {
      date: req.body.date,
      pitchId: req.body.pitchId,
      [Op.or]: [ 
        { [Op.and]: [{ start_time: { [Op.lt]: req.body.startTime } }, { end_time: { [Op.gt]: req.body.startTime } }] },
        { [Op.and]: [{ start_time: { [Op.lt]: req.body.endTime } }, { end_time: { [Op.gt]: req.body.endTime } }] },
        { [Op.and]: [{ start_time: { [Op.gte]: req.body.startTime } }, { end_time: { [Op.lte]: req.body.endTime } }] }
      ],
    }
  })
  .then(result => {
    if (result === null) {
      Reservation.create(
        {
          start_time: req.body.startTime,
          end_time: req.body.endTime,
          date: req.body.date,
          userId: req.body.userId,
          pitchId: req.body.pitchId,
        }
      )
      .then(() => {
        res.status(200).send('reservation added');
      })
      .catch((error) => {
        res.status(500).send(error);
      })
    } else {
      res.status(500).send('reservation cannot be added');
    }
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

module.exports = router;