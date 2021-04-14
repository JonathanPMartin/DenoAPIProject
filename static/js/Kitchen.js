import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Home Page'
	const nav = ['logout', 'foo']
	nav.push('welcome')
	customiseNavBar(nav)
	//
	
	const url3 = `/Menu`
	const options3 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response3 = await fetch(url3, options3)
	const json3 = await response3.json()
	let Menu={}
	for (let i=0; i<json3.length;i++){
		Menu[json3[i].id]=json3[i].MenuItem
	}
	console.log('above menu')
	console.log(Menu)
	//
	const url5 = `/GetAllOrders`
	const options5 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response5 = await fetch(url5, options5)
	let orders= await response5.json()
	let orderdetials={}
	let tem={}
	for(let i = 0; i <orders.length; i++){
		let data= JSON.parse(orders[i].Detials)
		for(let j = 1; j <21; j++){
			tem[j]=0
		}
		for(let j = 0; j <data.length; j++){
			tem[data[j].menuid]=tem[data[j].menuid]+1
		}
		orderdetials[orders[i].id]=tem
		
	}
	//
	const url4 = `/GetTableOrders/placed`
	const options4 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response4 = await fetch(url4, options4)
	const json4 = await response4.json()
	for(let i =0;i<json4.length;i++){
		console.log(orderdetials[json4[i].orderid])
	}
	//
	
	let button = document.createElement("button");
			button.innerHTML = 'test';
			button.class='.button'
			button.id='test'
	var table = document.getElementById("myTable");

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(-1);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		// Add some text to the new cells:
		let body = document.getElementsByName("table")[0]
			body.appendChild(button);
		cell1.innerHTML = button
		cell2.innerHTML = 'test'
			//button.addEventListener ("click", function() {
				
			//})
	//document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()

}