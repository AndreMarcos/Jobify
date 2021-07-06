import Job from '../../../models/job'
import User from '../../../models/user'
import authenticate from '../../../middleware/authenticate'

const createJob = async (req, res) => {
    if(req.method == 'POST'){
        const id = req.user.id
        if(!req.body.title || !req.body.description){
            return res.status(400).send("Faltando dados para criação de serviço")
        }
        try{
            const user = await User.findOne({ _id: id })
            if (!user) {
                return res.status(400).send('User not found')
            }
            const job = await Job.create({...req.body, user: user})
            return res.status(200).send(job)
        }catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(createJob, 'POST')