import express from 'express'
import router from './router'
import morgan from 'morgan'

import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/users'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({message: "hello"})
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)

// error handler

app.use((err, req, res, next) => {
    // ! using next() in an asynchronous error handler does not make the server crash
    if (err.type === "auth") {
        res.status(401).json({ message: "unauthorized" })
    } else if (err.type === "input") {
        res.status(400).json({ message: "invalid input" })
    } else {
        res.status(500).json({ message: "internal server error" })
    }
    next()
})

export default app