const mongoose = require('../../utils/infrastructure/database/mongoose')

const JobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: ['open', 'closed'],
        default: 'open',
        lowercase: true
    },

    category: {
        type: String
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.models.Job || mongoose.model('Job', JobSchema)