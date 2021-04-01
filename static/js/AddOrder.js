import { customiseNavBar, showMessage } from './browserUtility.js'
export async function setup() {
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Add Order'
	const nav = ['logout', 'foo']
	nav.push('welcome')
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('sumbit', await uploadData)
}
async function Data(event){
	console.log('test')
	event.preventDefult()
	const formData={
		item:event.target.querySelector('input[name="itemordered"]').value
	}
	console.log(formData)
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	const response = await fetch(options)
}

async function uploadData(event) {
	event.preventDefault()
	const element = document.querySelector('input[name="file"]')
	console.log(element)
	const file = document.querySelector('input[name="file"]').files[0]
	file.base64 = await file2Base64(file)
	file.user = localStorage.getItem('username')
	console.log(file)
	const url = '/files'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(file)
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	console.log(json)
	showMessage('file uploaded')
}
