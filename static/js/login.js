
/* login.js */

import { customiseNavBar, showMessage } from './browserUtility.js'

export async function setup() {
	console.log('LOGIN: setup')
	document.querySelector('h1').innerText = 'Login'
	customiseNavBar(['register', 'login'])
	document.querySelector('form').addEventListener('submit', await login)
}

async function login() {
	event.preventDefault()
		console.log('form submitted')
		const token = getToken()
		const url = '/accounts'
		const options = {
			method: 'GET',
			headers: { 'Authorization': token }
		}
		const response = await fetch(url, options)
		
		let json = await response.json()
		console.log('json data bellow')
			console.log(json.data)
			localStorage.setItem('username', json.data.username)
			const url2 = `/Accounts/${json.data.username}`
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
			const userid=json2.id
			//
			const url3 = `/Staff/${userid}`
			const options3 = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': '3.14159265358979323'
				},
			}
			console.log('above call on form')
			const response3 = await fetch(url3, options3)
			let json3= await response3.json()
			let userjob =json3.job
			let staffid =json3.id
			//
			const Body={
				status:'Online'
			}
			const url4 = `/Staff/Stauts/${staffid}`
			const options4 = {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': token
				},
				body: JSON.stringify(Body)
			}
			const response4 = await fetch(url4, options4)
			let json4= await response4.json()
		if(response.status === 200) {
			console.log('json data bellow')
			console.log(json2.data)
			
			localStorage.setItem('username', json.data.username)
			localStorage.setItem('authorization', token)
			localStorage.setItem('userid', userid)
			localStorage.setItem('userjob',userjob)
			localStorage.setItem('staffid',staffid)
			window.location.href = '#home'
			showMessage(`you are logged in as ${json.data.username}`)
		} else {
			showMessage('invalid username or password')
			document.querySelector('input[name="pass"]').value = ''
		}
}

function getToken() {
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	console.log(data)
	const token = btoa(`${data.user}:${data.pass}`)
	return `Basic ${token}`
}
