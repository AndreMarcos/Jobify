import Job from '../../../models/job'
import User from '../../../models/user'
import Contract from '../../../models/contract'
import authenticate from '../../../middleware/authenticate'

const createContract = async (req, res) => {
    if(req.method == 'POST'){
        const idUser = req.user.id
        const idJob = req.body.idJob
        
        try{
            const user = await User.findOne({ _id: idUser })
            if (!user) {
                return res.status(400).send('User not found')
            }
            const job = await Job.findOne({ _id: idJob })
            if (!job) {
                return res.status(400).send('Job not found')
            }

            const contract = await Contract.create({user: user, job: job})
            return res.status(200).send(contract)
        }catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(createContract, 'POST')