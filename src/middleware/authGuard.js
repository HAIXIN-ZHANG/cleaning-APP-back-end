const{ validateToken } = require('../utils/jwt');

function authGuard(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json('Access denied');
    }
    const contentArray = authHeader.split(' ');
    if (contentArray.length !== 2 || contentArray[0] !== 'Bearer'){
        return res.status(401).json('Invalid token format');
    }

    console.log(contentArray[1]);
    const decoded = validateToken(contentArray[1]);
    console.log(decoded);
    if(!decoded){
        return res.status(401).json('Access denied');
    }
    req.user = decoded;
    return next();
};

function authGuardTradie(req, res, next){
    if (!req.user.role.includes('tradie')){
        return res.status(401).json('Operation denied');      
    }
    return next();
}

function authGuardClient(req, res, next){
    if (!req.user.role.includes('client')){
        return res.status(401).json('Operation denied');      
    }
    return next();
}

module.exports = { authGuard,authGuardTradie,authGuardClient };


