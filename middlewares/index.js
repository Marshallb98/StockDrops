const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
    //Authorization takes the session storage of user and trims it for the token value then verifies it, if true then lets move on to next. 
    try {
        const {authorization} = req.headers;
        if (authorization) {
            const token = authorization.split(' ')[1]?.trim();
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decodedToken;
            next();
        } else {
            res.status(500).send({error: 'Missing Auth header'});
        }
    } catch(err) {
        res.status(500).send({error: 'Unable to Validate User'});
    }
}