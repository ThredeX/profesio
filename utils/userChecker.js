class UserChecker {
	static doesExist(user) {
		return user ? true : false
	}

	static isAdmin(user) {
		return this.doesExist(user) && user.administrator ? true : false
	}

	static isTeacher(user) {
		return this.doesExist(user) && user.teacher ? true : false
	}

	static isStudent(user) {
		return this.doesExist(user) && user.student ? true : false
	}

  static canEdit(user) {
		return this.doesExist(user) && this.isAdmin(user) && user.administrator.can_edit
	}
}
module.exports = UserChecker
