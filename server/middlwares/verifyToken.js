const jwt = require("jsonwebtoken")
const verifyToken = (req,res,next) => {

    // const headers = req.headers["authorization"];
    //console.log(headers);
    // const token = headers.split(" ")[1];

    // const cookies = req.headers.cookie;
    // const token = cookies.split(" ")[1];

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];

    if(!token){
        return res.status(404).json({message:"NO token found"})
    }
    jwt.verify(String(token),process.env.JWT_SECRETE,(error,user)=>{
        if(error){
            return res.status(400).json({message:"Invalid Token"})
        }
        console.log(user);
        req.id= user.id;
    });
    next();
};

module.exports = verifyToken;