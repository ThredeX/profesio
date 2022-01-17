export async function logged() {
	
		let res = await fetch('/api/auth/me')
		if (res.ok) {
			let data = await res.json()
			return data
		}
        else{
            window.top.location.href = "/"
            return false
        }
	
}
