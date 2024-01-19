const jwt = require("jsonwebtoken")
exports.protected = (req, res, next) => {
    const token = req.cookies.token
    console.log(token);
    if (!token) {
        return res.status(401).json({
            message: "Unathorized Access.Please Provide Token"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "Invalide token"
        })
      }
      console.log("token verified")
        req.body.userId = decode.userId
    })
    next()
}