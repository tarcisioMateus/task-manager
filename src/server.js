import http from 'node:http'
import { json } from './middlewares/json'
import routes from './routes'

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => method === route.method && url === route.path)

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

const PORT = 3333

server.listen(PORT, console.log(`Server running on port ${PORT}`))