import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	let option = document.createElement("option");
	option.text = "Kiwi";
	document.querySelector('select[name="Items"]').add(option)
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Home Page'
	const nav = ['logout', 'foo']
	nav.push('welcome')
	customiseNavBar(nav)
	const url1 = `/TableOrder`
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
	console.log(json)
	//
	
	const url2 = `/Orders`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	
	//
	
	const url3 = `/Menu`
	const options3 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
		},
	}
	console.log('above call on form')
	const response3 = await fetch(url3, options3)
	const json3 = await response3.json()
	
	let data = {}
	let test = {}
	for (let i = 0; i < json2.length; i++) {
		
		test.ordertime=json2[i].ordertime
		test.userid=json2[i].userid 
		let menuitem=json3[json2[i].menuid-1].MenuItem
		data[json2[i].id]=[test.ordertime,test.userid,menuitem,json2[i].menuid]
	}
	let test2 = json[0].orderid
	console.log(test2)
	console.log(data[test2])
	//document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()

}