const {CustomAPIError} = require('../errors')
const {statusCode} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(statusCode.INTERNAL_SERVER_ERROR).send('Something went wrong try again later')
}

module.exports = errorHandlerMiddleware
