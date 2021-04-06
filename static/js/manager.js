import { customiseNavBar } from './browserUtility.js'

export async function setup() {
	console.log('manger')
	console.log(window.data)
	let option = document.createElement("option");
	option.text = "Kiwi";
	document.querySelector('select[name="users"]').add(option)
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'test'
	const nav = ['logout', 'foo','home']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
	const url1 = `/Staff`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	console.log('above call on form')
	const response = await fetch(url1, options1)
	const json = await response.json()
	console.log(json)
}

async function uploadData(event) {
	
	console.log('called')
	event.preventDefault()
	
	
	const id = document.querySelector('input[name="userid"]').value
	const Job=document.querySelector('input[name="job"]').value
	console.log(Job)
	const Body={
		job:Job
	}
	console.log(JSON.stringify(Body))
	const file = document.querySelector('input[name="file"]').files[0]
	
	
	const url = `/Staff/Job/${id}`
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
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('file uploaded')

}