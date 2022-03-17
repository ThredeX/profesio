const { User } = require('../models')

module.exports = async function (userinfo, postfix) {
	try {
    const pw = `${userinfo.surname.toLowerCase()}!_`
		const user = await User.create({
			...userinfo,
			username: `${userinfo.name}${userinfo.surname}.${postfix}`,
			password: pw,
		})
		return [user, pw]
	} catch (err) {
		throw new Error(err)
	}
}
