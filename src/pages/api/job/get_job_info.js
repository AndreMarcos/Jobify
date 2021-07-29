import Job from '../../../models/job'
import User from '../../../models/user'
import authenticate from '../../../middleware/authenticate'

const getJobInfo = async (req, res) => {
    if(req.method == 'GET'){
        try{    
            const job = await Job.findOne({_id : req.query.jobId})    
            return res.status(200).send(job)
        }catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(getJobInfo, 'GET')