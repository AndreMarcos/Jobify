import User from '../../../models/user'

import authenticate from '../../../middleware/authenticate'

const updateData = async (req, res) => {

    if (req.method == 'POST') {

        const { id } = req.user

        try {

            //address is a subdocument. This verification is to avoid mongodb from erasing everything while
            //saving only the req.body properties
            const address = req.body.address

            if (!address.street || !address.number || !address.district || !address.city || !address.cep || !address.state) {
                return res.status(400).send('Missing address fields')
            }

            const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true })

            if (!user) {
                return res.status(400).send('User not found')
            }

            return res.status(200).send(user)

        } catch (error) {
            return res.status(400).send(error)
        }

    } else {
        res.status(405).send('Request method not supported')
    }
}

export default authenticate(updateData, 'POST')