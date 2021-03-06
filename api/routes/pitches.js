const express = require('express');
const router = express.Router();
const { Pitch } = require('../sequalize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const checkJwt = require('../jwtConf')
/* This route doesn't need authentication */
router.get('/pitch/:id', (req, res, next) => {
	Pitch.findAll({
		where: {
			id: decodeURIComponent(req.params.id)
		}
	})
		.then(result => {
			res.status(200).send(result);
		})
		.catch(() => {
			res.status(500).send('no pitches find');
		})
});

router.get('/pitches', (req, res, next) => {
	Pitch.findAll({
		where: {
			[Op.and]:[
				{
					city: {
						[Op.like]: '%' + req.query.city + '%'
					},
					address: {
						[Op.like]: '%' + req.query.address + '%'
					}
				},
			]
		}
	})
		.then(result => {
			res.status(200).send(result);
		})
		.catch(error => {
			res.status(500).send(error);
		})
});

router.get('/pitches', (req, res, next) => {
	Pitch.findAll()
		.then(result => {
			res.status(200).send(result);
		})
		.catch(() => {
			res.status(500).send('no pitches find');
		})
});

router.post('/pitch', (req, res, next) => {
	Pitch.create(
		{
			name: req.body.name,
			city: req.body.city,
			address: req.body.address,
		}
	)
		.then(() => {
			res.status(200).send('pitch added!');
		})
		.catch(() => {
			res.status(500).send('pitch is not added!');
		})
});

module.exports = router;