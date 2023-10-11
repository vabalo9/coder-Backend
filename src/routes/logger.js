import { addLogger, logger } from './../utils.js'
import { Router } from "express";

const router=Router()

router.use(addLogger)

router.get('/', (req, res) => {

//el problema que tengo es que no se me estan imprimendo los logger de warning, error y fatal y aparte se me estan guardando en .log creo que era los info etc

    req.logger.debug(`1 +1 === 2`)
    req.logger.http(`Se llamo a esta ruta`)
    req.logger.info(`Se llamo a esta url`)
    req.logger.warning(`Don't worry. Is just a warning`)
    req.logger.error(`Se cayo el server 👎 `)
    req.logger.fatal(`FATAL !!! `)

    res.send('Logger Testing')
})

export default router
