import http from 'node:http'

const server = http.createServer(() => {

})

const PORT = 3333

server.listen(PORT, console.log(`Server running on port ${PORT}`))