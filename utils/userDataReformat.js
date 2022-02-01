export function userDataReformat(data) {
    let users = []
    console.log(data);
    for(let role in data) {
        for(let i = 0;i < data[role].length;i++){
<<<<<<< HEAD
            data[role][i].User.role = role.slice(0, -1)
=======
            if(data[role][i].User){

                data[role][i].User.role = role.slice(0, -1)
            }
>>>>>>> ae77ff7c51567afcd8c0f64681279d518f4e7e25
        }
        users.push(...data[role])
    }
    return users;
}