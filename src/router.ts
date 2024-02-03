import express from 'express'
import authentication_router  from './authentication/authentication_router'

const router = express.Router()

export default (): express.Router => {
    authentication_router(router)
    return router
}