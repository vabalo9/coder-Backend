import EErrors from "../services/errors/enums.js"
import {logger} from '../utils.js'

export default ((error, req, res, next)=>{
    logger.error(error.cause)
  
      switch(error.code){
      case EErrors.INVALID_TYPE_ERROR:
        return res.status(400).send({
          status:'error',
          error: error.name,
          cause:error.cause
        })
        default:
          return res.send({status:'error', error:'unhandled error'})
    }
  })