export function userDataReformat(data) {
    let users = []
    console.log(data);
    for(let role in data) {
        for(let i = 0;i < data[role].length;i++){
            if(data[role][i].User){
                data[role][i].User.role = role.slice(0, -1)
            }
        }
        users.push(...data[role])
    }
    return users;
}