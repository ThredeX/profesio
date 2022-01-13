module.exports = function (obj) {
	const keys = Object.keys(obj)
	let newObj = {}
	keys.forEach(key => {
		if (obj[key]) newObj[key.toLowerCase()] = obj[key]
	})
	return newObj
}
