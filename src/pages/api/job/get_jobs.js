import Job from '../../../models/job'
import User from '../../../models/user'
import authenticate from '../../../middleware/authenticate'

const getJobs = async (req, res) => {
    if(req.method == 'GET'){

        const curPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.limit) || 5

        try{
            const jobs = await Job.find()
            .populate(req.query.user ? 'user' : '')
            .skip((curPage - 1) * perPage)
            .limit(perPage)
            .sort('-createdAt')

            const totalJobs = await Job.find().countDocuments()

            return res.status(200).json({
                curPage: curPage,
                maxPage: Math.ceil(totalJobs / perPage),
                jobs: jobs
            })
        }catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(getJobs, 'GET')