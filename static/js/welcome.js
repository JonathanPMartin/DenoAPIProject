import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	console.log('manger')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'test'
	const nav = ['logout','home']
	customiseNavBar(nav)
	const url1 = `Table/Free`
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
	console.log(json)
	for (let i = 0; i < json.length; i++) {
		let id=json[i].id
		id=id.toString()
		let seats =json[i].seats
		seats=seats.toString()
		let tem= "Table:"+id+" Seats:"+seats
		let option = document.createElement("option");
		console.log(tem)
		option = document.createElement("option");
		option.text =tem;
		option.value =json[i].id
		document.querySelector('select[name="Tables"]').add(option)

	}
	document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	event.preventDefault()
	const Body={
		status:"Taken"
	}
	let id=document.querySelector('select[name="Tables"]').value
	const url = `/Tables/${id}`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
		body: JSON.stringify(Body)
		
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	const response = await fetch(url, options)
	window.location.href = '#home'
}