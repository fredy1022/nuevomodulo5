import express from 'express'

import { 
    getStudents, 
    getStudentsById, 
    getStudentByCategory, 
    postStudent, 
    putStudent, 
    deleteStudent
} from './apiFunctions/students.js'
import { middlewareLogs } from './apiFunctions/middlewares.js'
const server = express()
server.use(express.json())


server.use(middlewareLogs)

server.get('/', (req, res) => {
    res.send('hello world')
})
//crud = Create, Read, Update, Delete
//Students
server.get('/students', getStudents)

server.get('/students/buscarId/:id', getStudentsById)
 
server.get('/students/buscarCategoria/:categoria', getStudentByCategory)

server.post('/students', postStudent)

server.put('/students/:id', putStudent)

server.delete('/students/:id', deleteStudent)

server.listen(3002, () => console.log('server running on port 3002'))
