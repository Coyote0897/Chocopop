const jwt = requiere('jsonwebtoken');

module.exports = (req, res, next)=>{

    //autorizacion por header 
    const authHeader = req.get('Authorization');

    if(!authHeader){
        const error = new Error('no autorizado, no hay JWT');
        error.statuscode = 401;
        throw error;
    }
}

