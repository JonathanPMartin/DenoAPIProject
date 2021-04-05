
/* logout */

export async function setup() {
	console.log('LOGOUT')
	localStorage.removeItem('username')
	localStorage.removeItem('authorization')
	console.log(localStorage.getItem('userid'))
	localStorage.removeItem('userid')
	window.location.href = '#login'
}
