import { customiseNavBar, showMessage } from './browserUtility.js'
export async function setup() {
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Add Order'
	console.log('options')
	console.log(document.querySelector('select[name="itemordered"]'))
	const nav = ['logout', 'foo']
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
		if(json[i].status!=='NA'){
			let option = document.createElement("option")
			option.text = json[i].MenuItem
			option.value=json[i].MenuItem
			document.querySelector('select[name="itemordered"]').add(option)
		}
	}
	const url2 = `Table/Taken`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	console.log(json2)
	for (let i = 0; i < json2.length; i++) {
		let option = document.createElement("option")
			option.text = json2[i].id
			option.value=json2[i].id
			document.querySelector('select[name="Table"]').add(option)
	}
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
	
	
	
	showMessage('file uploaded')

}
