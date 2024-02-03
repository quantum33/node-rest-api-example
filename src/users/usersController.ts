import express from 'express'
import { getUsers, deleteUserById } from '../db/users'

export async function getAllUsers(
  req: express.Request,
  res: express.Response) {
    try {
      const users = await getUsers()

      return res.status(200).json(users)
    } catch (error) {
      console.log(error)
      return res.sendStatus(500)
    }
}

export async function deleteUser(
  req: express.Request,
  res: express.Response) { 
    try {
      const { id } = req.params
      
      if(!id) {
        res.sendStatus(401)
      }

      let result = await deleteUserById(id)
      return res.json(result)

    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
}