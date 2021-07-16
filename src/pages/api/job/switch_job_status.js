import Job from '../../../models/job'
import authenticate from '../../../middleware/authenticate'

const switchJobStatus = async (req, res) => {
    if(req.method == 'PUT'){
        const jobId = req.body.jobId

        if (!jobId) {
            return res.status(400).send('Missing form components')
        }

        try {

            var job = await Job.findOne({ _id: jobId })

            if (!job) {
                return res.status(400).send('Job not found')
            }

            job.status == 'open' ? job.status = 'closed' : job.status = 'open'

            await job.save()

            return res.status(200).send({ status: job.status })

        } catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(switchJobStatus, 'PUT')