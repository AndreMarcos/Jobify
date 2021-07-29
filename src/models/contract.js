const mongoose = require('../../utils/infrastructure/database/mongoose')

const ContractSchema = new mongoose.Schema({

    jobId: {
        type:String,
        required:true
    },

    jobTitle: {
        type:String,
        required:true
    },

    jobDescription: {
        type:String,
        required:true
    },

    jobCategory: {
        type:String,
    },   
    
    jobUser: {
        type:String,
        required:true
    },

    jobUserName: {
        type:String,
        required:true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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