function getTimes(data) {
	return [
		data.map(lec => lec.beginning).sort((a, b) => a - b),
		data.data.map(lec => lec.end).sort((a, b) => a - b),
	]
}
function secToHHMM(seconds) {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	return `${hours}:${minutes}`
}

function fromDB(data) {
	const [start, end] = getTimes(data)
	const ret = {}
	const days = ['mo', 'tu', 'we', 'th', 'fr']
	ret['time'] = {
		start: start.map(time => secToHHMM(time)),
		end: end.map(time => secToHHMM(time)),
	}

	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < start.length; j++) {
			for (let z; z < data.length; z++) {
				if (
					data[z].day === days[i] &&
					data[z].beginning === start[j] &&
					data[z].end === end[j]
				) {
					ret[i] = data[z].subject
					break
				} else {
					ret[i] = [null]
				}
			}
		}
	}

	return ret
}
function toDB(data) {
	return data
}

module.exports = { toDB, fromDB }
