import { Database } from "./database"
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
        description
      }
      database.insert('tasks', )
    }
  }
]