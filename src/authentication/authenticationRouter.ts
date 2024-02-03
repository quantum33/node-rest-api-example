import exoress from "express"
import { login, register } from "./authenticationController"

export default (router: exoress.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}