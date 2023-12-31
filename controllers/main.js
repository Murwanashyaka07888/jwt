// check username, password in post(login) request
// if exit create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors')

const login = async (req,res) =>{
    const {username,password} = req.body
    // mongoose validation
    // Joi
    // check in the controller
    if(!username || !password){
     throw new CustomAPIError('Please provide email and password')
    }
   // just for demo, normally provided by DB!!!
    const id = new Date().getDate
   //try to keep payload small, better experience for user
    //just for deleteModel, in production use login, complex and unguessable string value!!!!!!!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})
    res.status(200).json({msg:'user created', token})
}
const dashboard = async (req,res) =>{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new CustomAPIError('no token provided',401)

  }
  const token = authHeader.split(' ')[1]


  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, ${decoded.username}`, secret:`Here is your authorized data,
    your lucky number is ${luckyNumber}`})
   
  } catch (error){
    throw new CustomAPIError('not authorized to access this route ',401)
  }
 
    
}
module.exports = {
    login,
    dashboard, 
  }