import { customiseNavBar, file2Base64, showMessage, getURL } from './browserUtility.js'

export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'test'
	const nav = ['logout', 'foo','home']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}

async function uploadData(event) {
	console.log('called')
	event.preventDefault()
	const element = document.querySelector('input[name="file"]')
	console.log(element)
	const id = document.querySelector('input[name="userid"]')
	const job=document.querySelector('input[name="job"]')
	console.log(job)
	const file = document.querySelector('input[name="file"]').files[0]
	file.base64 = await file2Base64(file)
	file.user = localStorage.getItem('username')
	console.log(file)
	const baseURl=getURL()
	const url = `${baseURl}/staff/${id}`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(job)
	const value = context.request.body({ type: 'json' });
	const data = await value
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('file uploaded')
}