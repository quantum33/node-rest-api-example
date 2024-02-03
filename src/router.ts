import express from 'express'
import authenticationRouter  from './authentication/authenticationRouter'
import usersRouter from './users/usersRouter'
const router = express.Router()

export default (): express.Router => {
    authenticationRouter(router)
    usersRouter(router)

    return router
}