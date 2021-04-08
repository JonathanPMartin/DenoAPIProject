import { customiseNavBar, showMessage } from './browserUtility.js'
export async function setup() {
	console.log('FOO')
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Secure Foo Page'
	const nav = ['logout','home']
	customiseNavBar(nav)
	const url1 = `/Menu`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response = await fetch(url1, options1)
	const json = await response.json()
	for (let i = 0; i < json.length; i++) {
		let option = document.createElement("option")
		option.text = json[i].MenuItem
		option.value=json[i].id
		document.querySelector('select[name="Menuitem"]').add(option)
	}
	document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	event.preventDefault()
	let item=document.querySelector('select[name="Menuitem"]').value
	let status=document.querySelector('select[name="Status"]').value
	console.log(status)
	let Body={
		status:status
	}
	const url = `/Menu/${item}`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
		body: JSON.stringify(Body)
	}
	const response = await fetch(url, options)
	console.log(response)
	const json = await response.json()
	var today = new Date();
	
	let date=today.getDate()
	if(date<10){
		date="0"+date.toString()
	}
	let month= today.getMonth()+1
	if(month<10){
		month="0"+month.toString()
	}
	let year=today.getFullYear()
	let hour=today.getHours()
	if(hour<10){
		hour="0"+hour.toString()
	}
	let mins= today.getMinutes()
	if (mins<10){
		mins="0"+mins.toString()
	}
	let seconds=today.getSeconds()
	if (seconds<10){
		seconds="0"+seconds.toString()
	}
	let time=date+"/"+month+"/"+year+" "+hour+":"+mins+":"+seconds
	console.log(time)
	
}
