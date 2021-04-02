import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	console.log('manger')
	let option = document.createElement("option");
	option.text = "Kiwi";
	document.querySelector('select[name="Tables"]').add(option)
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'test'
	const nav = ['logout', 'foo','home']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}