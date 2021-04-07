import { customiseNavBar,showMessage } from './browserUtility.js'

export async function setup() {
	console.log('manger')
	console.log(window.data)
	
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'test'
	const nav = ['logout', 'foo','home']
	customiseNavBar(nav)
	
	const url1 = `/Online/Staff`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	console.log('above call on form')
	const response = await fetch(url1, options1)
	const json = await response.json()
	for (let i = 0; i < json.length; i++) {
		const url2 = `/Accounts/ID/${json[i].staffid}`
		const options2 = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': '3.14159265358979323'
			},
		}
		const response2 = await fetch(url2, options2)
		let json2= await response2.json()
		const user=json2.user
		json[i].user=user
		console.log(json[i])
		let option = document.createElement("option");
		option.text = user;
		option.id=json[i].id
		document.querySelector('select[name="users"]').add(option)
	} 
	document.querySelector('form').addEventListener('submit', await uploadData)	
}

async function uploadData(event) {
	const username2=document.querySelector('select[name="users"]').value
	console.log('called')
	
	event.preventDefault()
	const url2 = `/Accounts/User/${username2}`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	let json2= await response2.json()
	console.log(json2)
	const userid=json2.id
	//
	let id = userid
	
	console.log(username2)
	const Job=document.querySelector('select[name="job"]').value
	console.log(Job)
	const Body={
		job:Job
	}
	console.log(JSON.stringify(Body))
	const file = document.querySelector('input[name="file"]').files[0]
	
	
	const url = `/Staff/Set/Job/${id}`
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
	showMessage('Job Changed')
	window.location.href = '#home'

}