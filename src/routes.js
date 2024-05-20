import { Database } from "./database.js"
import { randomUUID } from "node:crypto"

const database = new Database()

export default [
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {
      const { title, description } = req.body

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: Date(),
        updated_at: Date()
      }
      database.insert('tasks', newTask)

      return res.writeHead(201).end()
    }
  }
]