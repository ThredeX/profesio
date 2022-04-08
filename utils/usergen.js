const { User } = require('../models')

module.exports = async function (userinfo, postfix) {
	try {
		const pw = `${userinfo.name.toLowerCase()}_${userinfo.surname.toLowerCase()}_${postfix.toUpperCase()}`
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


