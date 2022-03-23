import express from "express";
import db from "./config/dbConnect.js";
import books from "./models/Book.js";

db.on("error", console.log.bind(console, 'Connection error'))
db.once("open", () => {
    console.log('Connection was successful')
})

const app = express();

app.use(express.json())

// const books = [
//     { id: 1, "title": "The Lord Of The Rings" },
//     { id: 2, "title": "The Hobbit" }
// ]

app.get('/', (req, res) => {
    res.status(200).send('Node course')
})

app.get('/books', (req, res) => {
    books.find((err, books) => {
        res.status(200).json(books)
    })
})

app.get('/books/:id', (req, res) => {
    let index = getBook(req.params.id);
    res.json(books[index]);
})

app.post('/books', (req, res) => {
    books.push(req.body)
    res.status(201).send('Successful')
})

app.put('/books/:id', (req, res) => {
    let index = getBook(req.params.id);
    books[index].title = req.body.title;
    res.json(books);
})

app.delete('/books/:id', (req, res) => {
    let { id } = req.params;
    let index = getBook(id);
    books.splice(index, 1)
    res.send(`Book ${id} successfully removed`)
})

function getBook(id) {
    return books.findIndex(book => book.id == id);
}

export default app