const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dolcio.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: '5b34b0f514ee1263024e3487',
    issuer: `https://dolcio.auth0.com/`,
    algorithms: ['RS256']
});

module.exports = checkJwt;