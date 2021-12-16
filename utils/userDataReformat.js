export function userDataReformat(data) {
    let users = []
    for(let role in data) {
		users.push(data[role]);
    }
    return users;
}