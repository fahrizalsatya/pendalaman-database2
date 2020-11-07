// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Customer, CustomerType } from './mongoose'

async function initApp(){
    const app = express()

    // init db
    await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
    const customerModel = new Customer()

    app.use(bodyParser.json())

    app.post('/customer', async function (req, res, next) {
        try {
            await customerModel.create(req.body)
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true })
    })

    app.get('/customer', async function (req, res, next) {
        let customers: CustomerType[]
        try {
            customers = await customerModel.getAll()
        } catch (error) {
            return next(error)
        }

        return res.send(customers)
    })

    app.get('/customer/:id', function (req, res, next) {

    })

    app.put('/customer', function (req, res, next) {

    })

    app.delete('/customer', function (req, res, next) {

    })

    app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`App listen on port ${process.env.PORT || 8000}`)
    })
}

initApp()