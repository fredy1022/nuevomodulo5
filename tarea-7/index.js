import express from 'express'
import { readFile } from 'fs/promises'


const server = express()

server.get('/', (req, res) => {
    res.send('hello world')
})

server.get('/students', async (req, res) => {
    const students = await readFile('./students.json', 'utf-8')
    res.json(JSON.parse(students))
})

server.get('/students/:id', async (req, res) => {
    const id = req.params.id
    const students = await readFile('./students.json', 'utf-8')
    const listaStudents = JSON.parse(students)

    const studentEncontrado = listaStudents.find((student) => student.id === parseFloat(id))
   if(!studentEncontrado){
    return res.status(404).json({error: 'producto no encontrado'})
   }

    res.json(studentEncontrado)
})

server.listen(3002, () => console.log('server running on port 3002')) 