
/* logout */

export async function setup() {
	console.log('LOGOUT')
	const Body={
		status:' Offline'
	}
	const url = `/Staff/Stauts/${localStorage.getItem('staffid')}`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(Body)
	}
	const response = await fetch(url, options)
	let json= await response.json()
	localStorage.removeItem('username')
	localStorage.removeItem('authorization')
	localStorage.removeItem('userid')
	localStorage.removeItem('userjob')
	localStorage.removeItem('staffid')
	localStorage.removeItem('userid')
	window.location.href = '#login'
}
