const User = require('../models').User
// TODO: password generate
module.wexports = async function (userinfo, postfix) {
	try {
		console.log(userinfo)
		const user = await User.create({
			...userinfo,
			username: `${userinfo.name}${userinfo.surname}.${postfix}`,
			password: '123456',
		})
		return user
	} catch (err) {
		throw new Error(err)
	}
}
