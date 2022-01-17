const { Lecture } = require('../models')
const DAYS = ['mo', 'tu', 'we', 'th', 'fr']

function getTimes(data) {
	return [[...new Set(data.map(lec => lec.beginning).sort((a, b) => a - b))], [...new Set(data.map(lec => lec.end).sort((a, b) => a - b))]]
}
function secToHHMM(seconds) {
	return String(new Date(seconds * 1000).toISOString().match(/([0-9]{2}\:[0-9]{2})/g))
}

function HHMMtoSec(time) {
	const [hours, minutes] = time.split(':').map(Number)
	return hours * 3600 + minutes * 60
}

function fromDB(data) {
	const [start, end] = getTimes(data)
	let ret = { subjects:[[],[],[],[],[]], time: [] }
	for (let i = 0; i < start.length; i++) {
		ret['time'].push({start: secToHHMM(start[i]), end: secToHHMM(end[i])})		
	}
	console.log(ret)
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < start.length; j++) {
			for (let z = 0; z < data.length; z++) {
				if (data[z].days === DAYS[i] && data[z].beginning === start[j] && data[z].end === end[j]) {
					ret.subjects[i][j] = data[z]
					break
				}
				else{
					ret.subjects[i][j]= null
				}
			}
		}
	}

	return ret
}
async function toDB(data) {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < data.subjects[i].length; j++) {
			if (!(parseInt(data.subjects[i][j].SubjectId) === -1 && parseInt(data.subjects[i][j].TeacherId) === -1)) {
				await Lecture.create({
					days: DAYS[i],
					beginning: HHMMtoSec(data.time[j].start),
					end: HHMMtoSec(data.time[j].end),
					RoomId: parseInt(data.subjects[i][j].RoomId),
					TeacherId: parseInt(data.subjects[i][j].TeacherId),
					SubjectId: parseInt(data.subjects[i][j].SubjectId),
					FacultyId: parseInt(data.subjects[i][j].FacultyId),
				})
			}
		}
	}
}

module.exports = { toDB, fromDB }
