import http from 'node:http'
import { json } from './middlewares/json'

const server = http.createServer( async (req, res) => {
  const { method, url } = req

  await json(req, res)
  
})

const PORT = 3333

server.listen(PORT, console.log(`Server running on port ${PORT}`))