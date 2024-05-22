import { error } from "node:console"
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

      if ( !title || !description ) {
        throw new Error('please, fill in all the required fields.')
      }

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

      return res.writeHead(200).end(JSON.stringify(data))
    }
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body
      const { id } = req.params

      if ( !title && !description ) return res.writeHead(200).end()

      const currentTask = database.select('tasks', {'id': id})[0]
      if (currentTask.completed_at) {
        throw new Error('can NOT update an task that has been completed!')
      }

      const newTitle = title ? title : currentTask.title
      const newDescription = description ? description : currentTask.description

      const updatedTask = {
        title: newTitle,
        description: newDescription,
        completed_at: null,
        created_at: currentTask.created_at,
        updated_at: Date()
      }
      database.update('tasks', id, updatedTask)

      return res.writeHead(204).end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
]