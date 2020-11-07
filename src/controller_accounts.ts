// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { Account, AccountType } from './mongoose_account'

const acc = express.Router()

async function initApp() {
    const accountModel = new Account()

    acc.use(bodyParser.json())

    acc.post('/account', async function (req, res, next) {
        try {
            await accountModel.create(req.body)
        } catch (error) {
            return next(error)
        }

        return res.send({ success: true })
    })

    acc.get('/account', async function (req, res, next) {
        let accounts: AccountType[]
        try {
            accounts = await accountModel.getAll()
        } catch (error) {
            return next(error)
        }

        return res.send(accounts)
    })

    acc.get('/account/:id', async function (req, res, next) {
        let account: AccountType | null
        try {
            account = await accountModel.getByID(req.params.id)
        } catch (error) {
            return next(error)
        }

        return res.send(account)
    })

    acc.put('/account/:id', async function (req, res, next) {
        try {
            await accountModel.update(req.params.id, req.body)
        } catch (error) {
            return next(error)
        }

        res.send({ success: true })
    })

    acc.delete('/account/:id', async function (req, res, next) {
        try {
            await accountModel.delete(req.params.id)
        } catch (error) {
            return next(error)
        }

        res.send({ success: true })
    })
}

initApp()

export default acc