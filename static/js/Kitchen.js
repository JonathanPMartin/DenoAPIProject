import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	let option = document.createElement("option");
	option.text = "Kiwi";
	document.querySelector('select[name="Items"]').add(option)
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Home Page'
	const nav = ['logout', 'foo']
	nav.push('welcome')
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()

}