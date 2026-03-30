const fs = require('fs')

//Middleware -1

function logReqRes (filename) {
    return (req,res,next) => {
    
    fs.appendFile(
    "filename",
    `\n${req.ip} ${Date.now()},${req.method}: ${req.path}`,
    (err,data)=>{
        next();
    }
    );    
  };
}

module.exports = {
    logReqRes,
}