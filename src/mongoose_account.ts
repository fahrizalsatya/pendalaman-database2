import mongoose from 'mongoose'

export type AccountType = {
    account_id: object
    account_type: string,
    account_number: string,
    balance: number,
    issued_date: Date,
    admin_monthlyfee: number
}

export type AccountDocument = mongoose.Document & AccountType
var Schema = mongoose.Schema

//schema definition
const AccountSchema = new mongoose.Schema({
    account_id: { type: Schema.Types.ObjectId, ref: 'customer' },
    account_type: { type: String, required: true },
    account_number: { type: String, required: true },
    balance: { type: Number, required: true },
    issued_date: { type: Date, required: true },
    admin_monthlyfee: { type: Number, required: true }
})

export class Account {
    private model: mongoose.Model<AccountDocument>

    constructor() {
        this.model = mongoose.model('account', AccountSchema)
    }

    async create(data: AccountType) {
        try {
            const result = await this.model.create(data)
            console.log(`Insert result %j`, result)
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        let accounts: AccountType[]
        try {
            accounts = await this.model.find({})
        } catch (error) {
            throw error
        }

        return accounts
    }

    async getByID(accountID: string) {
        let account: AccountType | null
        try {
            account = await this.model.findById(accountID)
        } catch (error) {
            throw error
        }

        return account
    }

    async update(accountID: string, data: Partial<AccountType>) {
        try {
            await this.model.findByIdAndUpdate(accountID, { $set: data })
        } catch (error) {
            throw error
        }
    }

    async delete(accountID: string) {
        try {
            await this.model.findByIdAndDelete(accountID)
        } catch (error) {
            throw error
        }
    }
} 