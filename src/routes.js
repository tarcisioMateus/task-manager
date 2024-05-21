import { Database } from "./database.js"
import { buildRoutePath } from "./utils/buildRoutePath.js"
import { randomUUID } from "node:crypto"

const database = new Database()

export default [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
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
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req
      
      const data = database.select('tasks', search ? {'title': search} : null )

      return res.writeHead(200).end(data)
    }
  },
]