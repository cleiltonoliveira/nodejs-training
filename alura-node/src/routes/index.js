import express from "express";
import books from "./booksRoutes.js";
import authors from "../routes/authorsRoutes.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ title: 'Node course' })
    })

    app.use(
        express.json(),
        books,
        authors
    )
}

export default routes;