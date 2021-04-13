/* home.js */
import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	console.log('HOME')
	localStorage.setItem('orderid',2)
	console.log(localStorage.getItem('orderid')==undefined)
	const username = localStorage.getItem('username')
	
	console.log(`username: ${username}`)
	const url3 = `/Staff/${localStorage.getItem('userid')}`
	const options3 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response3 = await fetch(url3, options3)
	let json3= await response3.json()
	let userjob =json3.job
	
	localStorage.setItem('userjob', userjob)
	const url4 = `/AddOrder`
	const options4 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response4 = await fetch(url4, options4)
	let json4= await response4.json()
	let hope = json4[0]
	let hope2=hope.Detials
	let hope3 = JSON.parse(hope2)
	console.log(hope3)
	console.log(hope)
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

}