import http from 'http';
import url from 'url';
import fs from 'fs/promises'

const productos = await fs.readFile('./productos.json', 'utf-8')
const productosJson = JSON.parse(productos)

const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url);
    const method = req.method;
    console.log(method)
    if (parseUrl.path === '/productos' && method === 'GET') {
        //const productos =  await fs.readFile('./productos.json', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(productos);
    } else if (parseUrl.path === '/productos' && method === 'POST') {
        let body = '';
        console.log(body)

        req.on('data', (chunk) => body += chunk)
        req.on('end', async () => {
            productosJson.push(JSON.parse(body))
            const nuevoProducto = JSON.parse(body)
            const notUnique = productos.some((producto) => producto.nombre === nuevoProducto.nombre)
            productosJson.push(JSON.parse(body))
            if (notUnique) {
                res.writeHead(409, { 'content-type': 'text/plain' });
                res.end('el nombre del producto ya existe');
            } else {
                productosJson.push(JSON.parse(body))
                fs.writeFile('./productos.json', JSON.stringify(productosJson), 'utf-8')
                res.writeHead(201, { 'Content-type': 'text/plain' });
                res.end('Guardamos tu producto');
            }

        })

    } else if (parseUrl.path === '/productos' && method === 'PUT') {
        res.write(200, { 'Content-Type': 'text plain' });
        res.end('Actualizamos tu producto');
    } else if (parseUrl.path === '/productos' && method === 'DELETE') {
        res.write(204, { 'Content-Type': 'text plain' });
        res.end('Eliminamos tu producto');


    }
    else {
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.end('El endpoint solicitado no existe');

    }
})
server.listen(3000, () => console.log('servidor escuchando en el puerto 3000'))
