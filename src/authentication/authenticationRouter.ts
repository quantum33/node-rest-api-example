import exoress from "express"
import { login, logout, register } from "./authenticationController"

export default (router: exoress.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.post('/auth/logout', logout)
}