import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	const envURl='/Enivorment'
	const envOptions={
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	const envResponce=await fetch(envURl, envOptions)
	const envDetails=await envResponce.json()
	const env=envDetails.test !=='/home/codio'
	console.log('manger')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(localStorage.getItem('userjob') !== 'welcome')window.location.href = '#home'
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Welcome page'
	const nav = ['logout','home']
	customiseNavBar(nav)
	const url1 = `/API/1/Table/Free`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response = await fetch(url1, options1)
	const json = await response.json()
	console.log(json)
	for (let i = 0; i < json.length; i++) {
		let id=json[i].id
		let display=id
		if(env){
		display=display+6
		display=display/10
		}
		display=display.toString()
		id=id.toString()
		let seats =json[i].seats
		seats=seats.toString()
		let tem= "Table:"+display+" Seats:"+seats
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
	const url = `/API/1/Tables/${id}`
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(Body)
		
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	const response = await fetch(url, options)
	window.location.href = '#home'
}