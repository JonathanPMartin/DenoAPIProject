import { customiseNavBar, showMessage } from './browserUtility.js'
export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Secure Foo Page'
	const nav = ['logout','home']
	customiseNavBar(nav)
	const url1 = `/Menu`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response = await fetch(url1, options1)
	const json = await response.json()
	for (let i = 0; i < json.length; i++) {
		let option = document.createElement("option")
		option.text = json[i].MenuItem
		option.value=json[i].id
		document.querySelector('select[name="Menuitem"]').add(option)
	}
	document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	event.preventDefault()
	let item=document.querySelector('select[name="Menuitem"]').value
	let status=document.querySelector('select[name="Status"]').value
	console.log(status)
	let Body={
		status:status
	}
	const url = `/Menu/${item}`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
		body: JSON.stringify(Body)
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
}
