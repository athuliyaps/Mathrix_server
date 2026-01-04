const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// const jwtMiddleware = (req,res,next)=>{
//     console.log("inside middleware");
//     const token = req.headers["authorization"].split(" ")[1]
//     console.log(token);
//     if(token){
//         try{
//            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
//            console.log(jwtResponse);
//            req.userId = jwtResponse.userId
//            next()
           
//         }catch(err){
//             res.status(401).json("Authentication failed...Please login")
//         }
      
//     }else{
//         res.status(404).json("Authorization failed...Token is missing!!!")
//     }
    
    
// }

// module.exports= jwtMiddleware

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header:', authHeader);
    
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Recived token:', token);
    

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWTPASSWORD);
        console.log(decoded);    
        req.userId = decoded.userId
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = jwtMiddleware;