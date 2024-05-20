import http from 'node:http'
import { json } from './middlewares/json.js'
import routes from './routes.js'

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => method === route.method && route.path.test(url) )

  if (route) {
    const routeParams = url.match(route.path)
    req.params = { ...routes.groups }
    
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

const PORT = 3333

server.listen(PORT, console.log(`Server running on port ${PORT}`))