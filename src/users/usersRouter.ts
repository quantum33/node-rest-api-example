import exoress from "express"
import { getAllUsers } from "./usersController"

export default (router: exoress.Router) => {
    router.get('/users', getAllUsers)
}