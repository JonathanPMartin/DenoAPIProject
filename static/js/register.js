
/* register.js */

import { customiseNavBar, showMessage } from './browserUtility.js'

export async function setup() {
	document.querySelector('h1').innerText = 'Register a New Account'
	customiseNavBar(['register', 'login'])
	document.querySelector('form').addEventListener('submit', await register)
}

async function register() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const url = '/API/1/accounts'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization':'3.14159265358979323'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
	//
	console.log('above test')
	console.log(data.user)
	const url2 = `/Accounts/User/${data.user}`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization':'3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	let json2= await response2.json()
	const userid=json2.id
	//
	const Body={
		status:'online'
	}
	const url4 = `/API/1/Staff/New/${userid}`
	const options4 = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
		body: JSON.stringify(Body)
	}
	const response4 = await fetch(url4, options4)
	let json4= await response4.json()
	showMessage('new account created')
	window.location.href = '#login'
}