/* home.js */
import { customiseNavBar } from './browserUtility.js'
export async function setup() {
	console.log('HOME')
	if (localStorage.getItem('redirect')!= undefined){
		let tem=localStorage.getItem('redirect')
		console.log(tem)
		localStorage.removeItem('redirect')
		window.location.href = tem
	}
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
	for(let i = 0; i <orders.length; i++){
		let data= JSON.parse(orders[i].Detials)
		let places = data.length
		orderdetials[orders[i].id] = places
	}
	console.log(orderdetials)
	
	//
	const url4 = `/GetAllTableOrders`
	const options4 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response4 = await fetch(url4, options4)
	let tableorders = await response4.json()
	let tableorderdetails=[]
	for(let i = 0; i <tableorders.length; i++){
		let time=tableorders[i].ordertime
		let time2=time.substr(11, 17);
		let places=orderdetials[tableorders[i].orderid]
		let status=tableorders[i].status
		let body={
			table:tableorders[i].tableid,
			places:places,
			time:time2,
			status:status
		}
		if(status==='placed'||'ready'){
			tableorderdetails.push(body)
		}
	}
	console.log(tableorderdetails)
	for(let i = 0; i <tableorderdetails.length; i++){
		var table = document.getElementById("myTable");

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(-1);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		// Add some text to the new cells:
		cell1.innerHTML = tableorderdetails[i].table;
		cell2.innerHTML = tableorderdetails[i].places;
		cell3.innerHTML = tableorderdetails[i].time;
		cell4.innerHTML = tableorderdetails[i].status;
	}
	console.log(tableorderdetails)
	
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