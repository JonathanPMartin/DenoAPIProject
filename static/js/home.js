/* home.js */
import { customiseNavBar, showMessage } from './browserUtility.js'
export async function setup() {
	console.log('HOME')
	const username = localStorage.getItem('username')
	
	console.log(`username: ${username}`)
	const url3 = `/Staff/${localStorage.getItem('userid')}`
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
	
	localStorage.setItem('userjob', userjob)
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
	console.log(localStorage.getItem('uerjob'))
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Home Page'
	const nav = ['logout']
	//nav.push('welcome')
	
	
	if(localStorage.getItem('userjob') ==='manager'){
		nav.push('manager')
		//console.log('test')
		//console.log(nav)
	} else if(localStorage.getItem('userjob') ==='server'){
		nav.push('AddOrder')
	}else if(localStorage.getItem('userjob') ==='cheff'){
		nav.push('Kitchen')
	}else{
		console.log('welp')
	}
	customiseNavBar(nav)
	//document.querySelector('form').addEventListener('submit', await uploadData)
	console.log(localStorage.getItem('userjob'))
}
async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()
/*	
	
	const itemordered = document.querySelector('select[name="itemordered"]').value
	
	const quantity=document.querySelector('input[name="quantity"]').value
	console.log(itemordered)
	const Body={
		job:itemordered
	}
	console.log(JSON.stringify(Body))
	
	
	const url = `/staff/1`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
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
*/
}