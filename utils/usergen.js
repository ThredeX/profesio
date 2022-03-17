const generator = require('generate-password')
const { User } = require('../models')

module.exports = async function (userinfo, postfix) {
	try {
		const pw = generator.generate({ numbers: true })
		const user = await User.create({
			...userinfo,
			username: `${userinfo.name.toLowerCase()}${userinfo.surname.toLowerCase()}.${postfix}`,
			password: pw,
		})
		return [user, pw]
	} catch (err) {
		throw new Error(err)
	}
}
