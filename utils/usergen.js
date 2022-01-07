const User = require('../models').User
// TODO: password generate
module.exports = async function (userinfo, postfix) {
	try {
		console.log(userinfo)
		const user = await User.create({
			username: `${userinfo.name}${userinfo.surname}.${postfix}`,
			password: '123456',
		})
		return user
	} catch (err) {
		throw new Error(err)
	}
}
