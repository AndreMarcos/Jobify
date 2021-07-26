import Job from '../../../models/job'
import User from '../../../models/user'
import Contract from '../../../models/contract'
import authenticate from '../../../middleware/authenticate'

const createContract = async (req, res) => {
    if(req.method == 'POST'){
        const idUser = req.user.id
        try{
            const user = await User.findOne({ _id: idUser })
            if (!user) {
                return res.status(400).send('User not found')
            }
            const contract = await Contract.create({...req.body, user: user})
            return res.status(200).send(contract)
        }catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(createContract, 'POST')