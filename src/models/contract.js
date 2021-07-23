const mongoose = require('../../utils/infrastructure/database/mongoose')

const ContractSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required:true
    },

    status:{
        type:String,
        enum: ['Aguardando', 'Aprovado', 'Recusado', 'Finalizado'],
        default: 'Aguardando',
        required:true
    }

})

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema)