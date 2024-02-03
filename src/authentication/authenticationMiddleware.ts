import express from "express"
import { get, merge, result } from "lodash"
import { getUserBySessionToken } from "../db/users"

export async function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) {
  try {
    const sessionToken = req.cookies["MY-COOKIE"]
  
    console.log('sessionToken: ' + sessionToken)

    if (!sessionToken) {
      return res.sendStatus(403)
    
    }

    const existingUser = getUserBySessionToken(sessionToken)
  
    if (!existingUser) {
      return res.sendStatus(403)
    
    }

    merge(req, { identity: existingUser })
  

    return next()
  } catch (error) {
    console.log(error)
  
    return res.sendStatus(500)
  
  }
}

export async function isOwner(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) {
    try {
      const {id} = req.params
      const currendUserId = get(req, 'identity._id') as string

      if (!currendUserId) {
        return res.sendStatus(401)
      }
      if (currendUserId != id) {
        return res.sendStatus(403)
      }

      next()

    } catch (error) {
      console.log(error)
      return res.sendStatus(500)
    }
}