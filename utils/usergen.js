const User = require('../models').User
// TODO: generate username and password hash
module.exports = async function (userinfo) {
	try {
		const user = await User.create({
			...userinfo,
			username: userinfo.name + userinfo.surname,
			password: '123456',
		})
		return user
	} catch (err) {
		throw err
	}
}
