import  jsonwebtoken from "jsonwebtoken";
const authmiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).send({
          success: false,
          message: 'No token provided'
        });
      }
  
      const token = authHeader.split(" ")[1];
      jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: 'Auth failed'
          });
        } else {
          req.body.userId = decoded.userId; // assuming your token payload contains a userId
          next();
        }
      });
        
    } catch (error) {
        console.log(error)
        return res.status(401).send({
            success : false,
            message : 'auth failed',
            error
        
        })
        
    }
};
export {authmiddleware};