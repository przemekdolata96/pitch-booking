var express = require('express');
var router = express.Router();

const checkJwt = require('../jwtConf')

// This route need authentication
router.get('/', checkJwt, function (req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

module.exports = router;
