import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Add Order'
	console.log('options')
	let option = document.createElement("option");
	option.text = "Kiwi";
	document.querySelector('select[name="itemordered"]').add(option)
	console.log(document.querySelector('select[name="itemordered"]'))
	const nav = ['logout', 'foo']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}

async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()
	
	
	const itemordered = document.querySelector('select[name="itemordered"]').value
	
	const quantity=document.querySelector('input[name="quantity"]').value
	console.log(itemordered)
	const Body={
		job:itemordered
	}
	console.log(JSON.stringify(Body))
	
	
	const url = `/staff/1`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(Body)
		
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('file uploaded')

}
