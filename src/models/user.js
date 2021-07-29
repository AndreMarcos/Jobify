const mongoose = require('../../utils/infrastructure/database/mongoose')
const AddressSchema = require('./address')

const UserSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    birthDate: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },

    cpf: {
        type: String,
        required: true
    },

    address: AddressSchema,

    phone: {
        type: String,
        required: true
    }
})

export default mongoose.models.User || mongoose.model('User', UserSchema)