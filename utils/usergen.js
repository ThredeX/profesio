const bcrypt = require('bcrypt')
const generator = require('generate-password')
// TODO: password generate
module.exports = async function (userinfo, postfix) {
	try {
		const pw = generator.generate({ numbers: true })
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
