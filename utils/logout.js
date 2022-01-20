export default function() {
    fetch('/api/auth/logout', {
        method: "POST"
    })
    .then(res => {
        if(res.ok){
            window.top.location.href = '/'
            alert("Byl jste odhlášen")
        }
    })
    .catch(err => console.error(err))
}