// register root file untuk menggunakan sourcemap
import 'source-map-support/register'

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cust from './controller_customers'
import acc from './controller_accounts'
import transac from './controller_transactions'

const app = express()

// init db
mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.get('/', (req, res) => { res.json({ message: 'Success!' }) })

//App API
app.use('/account', acc)
app.use('/customer', cust)
app.use('/transaction', transac)

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send({
        success: false,
        message: err.message
    })
})

app.listen(process.env.PORT || 8000, () => {
    console.log(`App listen on port ${process.env.PORT || 8000}`)
})