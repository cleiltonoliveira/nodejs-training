const http = require('http')

const port = 3000;

const rotas ={
    '/': 'Curso de node',
    '/livros': 'Lista de livros',
    '/autores': 'Listagem de autores',
    '/editora': 'Pág da editora',
    '/sobre': 'More details about'
}

const server = http.createServer((req, res)=> {
    res.writeHead(200, {'Content-Type': 'text/plan'});
    res.end(rotas[req.url]);
})

server.listen(port, () =>{
    console.log(`Servidor escutando em http://localhost:${port}`)
})