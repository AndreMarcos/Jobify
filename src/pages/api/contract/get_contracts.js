import Job from '../../../models/job'
import User from '../../../models/user'
import Contract from '../../../models/contract'
import authenticate from '../../../middleware/authenticate'

const getContracts = async (req, res) => {
    if(req.method == 'GET'){

        const curPage = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.limit) || 5
        let contracts=[];
        let totalContracts = 0;
        try{
            const id = req.user.id
            if(req.query.user == "true"){
                contracts = await Contract.find({user: id})
                .populate('user')
                .skip((curPage - 1) * perPage)
                .limit(perPage)
                .sort('-createdAt')
                totalContracts = await Contract.find({user: id}).countDocuments()
            }else{
                const jobs = await Job.find({user: id})
                jobs.map((job)=>{
                    let aux = await Contract.find({jobId:job._id})
                    contracts = [...contracts, ...aux]
                    totalContracts += await Contract.find({jobId:job._id}).countDocuments()
                })
            }

            return res.status(200).json({
                curPage: curPage,
                maxPage: Math.ceil(totalContracts / perPage),
                contracts : contracts
            })
        }catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(getContracts, 'GET')