import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import { stringify } from 'querystring'

const server = express()
 
server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello world')
})

 server.get('/students', async (req, res) => {
    const students = await readFile('./students.json', 'utf-8')
    res.json(JSON.parse(students))
 })
 server.get('/students/buscarId/:id', async (req, res) => {
    const id = req.params.id
    const students = await readFile('./students.json', 'utf-8')
    const listaStudents = JSON.parse(students)
    const studentEncontrado = listaStudents.find((student) => student.id === parseFloat(id))
        
    if(!studentEncontrado){
    return res.status(404).json({error: 'student no encontrado'})
   }
   res.json(studentEncontrado)
})
server.get('/students/buscarCategoria/:categoria', async (req, res) => {
    const categoria = req.params.categoria
    const students = await readFile('./students.json', 'utf-8')
    const listaStudents = JSON.parse(students)
    const studentsEncontrados = listaStudents.filter((student) => {
        return student.categoria.toUpperCase() === categoria.toUpperCase()
    })
    if(studentsEncontrados.length === 0){
        return res.status(404).json({error: 'No se encontraron students con esa categoria'})
    }
    res.json(studentsEncontrados)
})

       
         server.post('/students', async (req, res)  => {
            console.log('students')
            const nuevoStudent = req.body
            const students = await readFile('./students.json', 'utf-8')
            const listaStudents = JSON.parse(students)
            listaStudents.push(nuevoStudent)
            writeFile('./students.json',JSON.stringify(listaStudents), 'utf-8')
            console.log(listaStudents)
           res.status(201).json(listaStudents)
   })

   server.put('/students/:id', async (req, res) => {
    const id = req.params.id
    const nuevoStudent = req.body
    const students = await readFile('./students.json', 'utf-8')
    const listaStudents = JSON.parse(students)

    const studentExistente = listaStudents.findIndex(student => student.id === parseFloat(id)) 
    if(studentExistente === -1){
        return res.status(404).json({error: 'El student no existe'})
    }
   
    listaStudents[studentExistente] = nuevoStudent
    writeFile('./students.json', JSON.stringify(listaStudents), 'utf-8')
    res.send({message: 'Student actualizado', student: nuevoStudent})

   })

   server.delete('/students/:id', async (req, res) => {
    const id = req.params.id

    const students = await readFile('./students.json', 'utf8')
    const listaStudents = JSON.parse(students)

    const studentExistente = listaStudents.findIndex(student => student.id === parseFloat(id)) 
    if(studentExistente === -1){
        return res.status(404).json({error: 'El student no existe'})
    }
    listaStudents.splice(studentExistente, 1)
    writeFile('./students.json', JSON.stringify(listaStudents), 'utf8')
    res.send({message: 'Student eliminado'})
   
   
   })
 server.listen(3002, () => console.log('server running on port 3002'))
