import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];
  if (typeof bearer !== 'undefined') {
    const bearerToken = bearer.split(' ')[1];
    req.token = bearerToken;
    console.log(req.token);
    jwt.verify(req.token, process.env.SECRETE_KEY, (err, result) => {
      console.log(err);
      if (err) res.status(401).json('unauthorised2');
      else {
        req.result = result.isAdmin;
        req.id = result.id;
        console.log(result)
        console.log(req.result);
        next();
      }
    })
  } else {
    res.status(401).json('unauthorised');
  }
  
};

export default verifyToken;
