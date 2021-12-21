export function userDataReformat(data) {
    let users = []

    for(let role in data) {
        for(let i = 0;i < data[role].length;i++){
            data[role][i].User.role = role
        }
        users.push(...data[role])
    }
    return users;
}