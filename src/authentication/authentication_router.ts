import exoress from "express";

import { login, register } from "../authentication/authentication_controller";

export default (router: exoress.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
}