import { addLogger, logger } from './../utils.js'
import { Router } from "express";

const router=Router()

router.use(addLogger)

router.get('/', (req, res) => {



    req.logger.error(`Se cayo el server 👎 `)
    req.logger.warning(`Don't worry. Is just a warning`)
    req.logger.info(`Se llamo a esta url`)
    req.logger.http(`Se llamo a esta ruta`)
    req.logger.debug(`1 +1 === 2`)
    req.logger.fatal(`FATAL !!! `)

    res.send('Logger Testing')
})

export default router
