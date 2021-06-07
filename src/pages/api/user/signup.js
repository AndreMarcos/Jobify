import User from '../../../models/user'
const bcrypt = require('bcrypt')
const mongoose = require('../../../../utils/infrastructure/database/mongoose')
import { getTime } from "../../../common/date_functions";

export default async function signup(req, res) {

    if (req.method == 'POST') {

        const { name, email, password } = req.body

        try {

            if (!name || !password || !email) {
                return res.status(400).send('Missing signup parameters')
            }

            if (await User.findOne({ email: email })) {
                return res.status(400).send('E-mail already used')
            }

            //some formatting to keep DB organized
            var birthday = new Date(req.body.birthDate)
            getTime(birthday)
            birthday.setHours(-3, 0, 0)

            bcrypt.hash(password, 12, async function (err, hash) {
                // Store hash in your password DB.

                const user = await User.create({ ...req.body, password: hash, birthDate: birthday })

                return res.status(200).send('Success')

            });

        } catch (e) {
            return res.status(400).send(e)

        }

    } else {
        return res.status(405).send('Request method not supported')
    }

}