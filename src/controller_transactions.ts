// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Transaction, TransactionType } from './mongoose_transaction'

const transac = express.Router()

async function initApp() {
    const transactionModel = new Transaction()

    transac.use(bodyParser.json())

    transac.post('/transaction', async function (req, res, next) {
        try {
            await transactionModel.create(req.body)
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true })
    })

    transac.get('/transaction', async function (req, res, next) {
        let transactions: TransactionType[]
        try {
            transactions = await transactionModel.getAll()
        } catch (error) {
            return next(error)
        }

        return res.send(transactions)
    })

    transac.get('/transaction/:id', async function (req, res, next) {
        let transaction: TransactionType | null
        try {
            transaction = await transactionModel.getByID(req.params.id)
        } catch (error) {
            return next(error)
        }

        return res.send(transaction)
    })

    transac.put('/transaction/:id', async function (req, res, next) {
        try {
            await transactionModel.update(req.params.id, req.body)
        } catch (error) {
            return next(error)
        }

        res.send({ success: true })
    })

    transac.delete('/transaction/:id', async function (req, res, next) {
        try {
            await transactionModel.delete(req.params.id)
        } catch (error) {
            return next(error)
        }

        res.send({ success: true })
    })
}

initApp()

export default transac