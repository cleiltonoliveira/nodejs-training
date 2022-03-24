import books from "../models/Book.js";

class BookController {

    static listBooks = (req, res) => {
        books.find((err, books) => {
            res.status(200).json(books)
        })
    }

    static listBookById = (req, res) => {
        const id = req.params.id;
        books.findById(id, (err, book) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Book not found` })
            } else {
                res.status(200).send(book.toJSON())
            }
        })
    }

    static createBook = (req, res) => {
        let book = new books(req.body);
        book.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Error creating book` })
            } else {
                res.status(201).send(book.toJSON())
            }
        })
    }

    static updateBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(201).send({ message: 'Successful' })
            } else {
                res.status(500).send({ message: `${err.message} - Error updating book` })
            }
        })
    }

    static deleteBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Successful' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }
}

export default BookController;