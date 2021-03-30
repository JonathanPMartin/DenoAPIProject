/* home.js */
export async function setup() {
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Secure Foo Page'
	const nav = ['logout', 'foo']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}