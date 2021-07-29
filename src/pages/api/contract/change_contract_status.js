import Contract from '../../../models/contract'
import authenticate from '../../../middleware/authenticate'

const changeContractStatus = async (req, res) => {
    if(req.method == 'PUT'){
        const contractId = req.body.contractId
        const contractStatus = req.body.contractStatus

        if (!contractId || !contractStatus) {
            return res.status(400).send('Missing form components')
        }

        try {

            var contract = await Contract.findOne({ _id: contractId })

            if (!contract) {
                return res.status(400).send('Contract not found')
            }

            contract.status = contractStatus

            await contract.save()

            return res.status(200).send({ status: contract.status })

        } catch (error) {
            return res.status(400).send(error)
        }
    }else{
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(changeContractStatus, 'PUT')