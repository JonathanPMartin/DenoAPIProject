
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
			const url1 = `/accounts/${json.data.username}`
			const options1 = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('authorization')
				},
			}
			console.log('above call on form')
			const response2 = await fetch(url1, options1)
			
		if(response.status === 200) {
			console.log('json data bellow')
			console.log(json.data)
			localStorage.setItem('username', json.data.username)
			localStorage.setItem('authorization', token)
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
