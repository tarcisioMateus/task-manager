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
        return res.writeHead(400).end('please, fill in all the required fields.')
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
      const { search } = req.query
      
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

      if ( !title && !description ) return res.writeHead(401).end("there's nothing to be updated")

      const currentTask = database.select('tasks', {'id': id})[0]
      if (!currentTask) {
        return res.writeHead(404).end('non-existent task')
      }
      if (currentTask.completed_at) {
        return res.writeHead(403).end('can NOT update an task that has been completed!')
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
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      /* 
      if the task has been marked as completed already,
      using this route again will mark it as not completed
      */
      const { id } = req.params

      const currentTask = database.select('tasks', {'id': id})[0]
      if (!currentTask) {
        return res.writeHead(404).end('non-existent task')
      }

      const updatedTask = {
        title: currentTask.title,
        description: currentTask.description,
        completed_at: Date(),
        created_at: currentTask.created_at,
        updated_at: Date()
      }
      if (currentTask.completed_at) {
        updatedTask.completed_at = null
      }

      database.update('tasks', id, updatedTask)

      return res.writeHead(204).end()
    }
  },
]