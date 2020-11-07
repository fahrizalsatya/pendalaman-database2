// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())

app.post('/customer', function (req, res, next) {

})

app.get('/customer', function (req, res, next) {

})

app.get('/cutomer/:id', function (req, res, next) {

})

app.put('/customer', function (req, res, next) {

})

app.delete('/customer', function (req, res, next) {

})

app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${process.env.PORT || 8000}`)
})