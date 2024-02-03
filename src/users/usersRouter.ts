import exoress from "express"
import { getAllUsers, deleteUser } from "./usersController"
import { isAuthenticated, isOwner } from "../authentication/authenticationMiddleware"

export default (router: exoress.Router) => {
  router.get("/users", isAuthenticated, getAllUsers)
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
}