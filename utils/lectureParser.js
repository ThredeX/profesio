const { Lecture } = require('../models')
const days = ['mo', 'tu', 'we', 'th', 'fr']

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

function HHMMtoSec(time) {
	const [hours, minutes] = time.split(':').map(Number)
	return hours * 3600 + minutes * 60
}

function fromDB(data) {
	const [start, end] = getTimes(data)
	let ret = { subjects: [] }
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
					ret['subjects'][i][j] = data[z].subject
					break
				} else {
					ret['subjects'][i][j] = [null]
				}
			}
		}
	}

	return ret
}
async function toDB(data) {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < data.subjects[i].length; j++) {
			await Lecture.create({
				days: days[i],
				beginning: HHMMtoSec(data.time.start[j]),
				end: HHMMtoSec(data.time.end[j]),
				RoomId: data.subjects[i][j].roomId,
				TeacherId: data.subjects[i][j].teacherId,
				SubjetId: data.subjects[i][j].subjectId,
				FacultyId: data.subjects[i][j].facultyId,
			})
		}
	}
}

module.exports = { toDB, fromDB }
