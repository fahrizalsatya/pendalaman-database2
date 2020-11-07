// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Customer, CustomerType } from './mongoose_customer'

const cust = express.Router()

async function initApp() {
    const customerModel = new Customer()

    cust.use(bodyParser.json())

    cust.post('/customer', async function (req, res, next) {
        try {
            await customerModel.create(req.body)
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true })
    })

    cust.get('/customer', async function (req, res, next) {
        let customers: CustomerType[]
        try {
            customers = await customerModel.getAll()
        } catch (error) {
            return next(error)
        }

        return res.send(customers)
    })

    cust.get('/customer/:id', async function (req, res, next) {
        let customer: CustomerType | null
        try {
            customer = await customerModel.getByID(req.params.id)
        } catch (error) {
            return next(error)
        }

        return res.send(customer)
    })

    cust.put('/customer/:id', async function (req, res, next) {
        try {
            await customerModel.update(req.params.id, req.body)
        } catch (error) {
            return next(error)
        }

        res.send({ success: true })
    })

    cust.delete('/customer/:id', async function (req, res, next) {
        try {
            await customerModel.delete(req.params.id)
        } catch (error) {
            return next(error)
        }

        res.send({ success: true })
    })
}

initApp()

export default cust