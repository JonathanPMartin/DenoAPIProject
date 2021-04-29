import { customiseNavBar,Kitchen } from './browserUtility.js'
export async function setup() {
	console.log('above Kitchen Route')
	let test = await Kitchen()
	if(localStorage.getItem('userjob') !== 'cheff')window.location.href = '#home'
	console.log('above test')
	console.log(test)
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Kitchen Page'
	const nav = ['logout', 'home']
	customiseNavBar(nav)
	//
	
	const url3 = `/API/1/Menu`
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
	
	let body=""
	/*for(let i=0; i<Orders.length;i++){
		body=body+`<section><h3>Order id ${Orders[i].id} Time ${Orders[i].time}</h3>`
		body=body+`<p>items orderd ${Orders[i].items}</p>`
		body=body+`<input type = 'button' id ="${Orders[i].id}" value= 'ready'></section>`
		
	}*/
	for(let i=0; i<test.length;i++){
		let tem= test[i].id
		body=body+`<section><h3>Order id ${test[i].id} Time ${test[i].time}</h3>`
		body=body+`<p>${test[i].items}</p>`
		body=body+`<input type = 'button' id ="${test[i].id}" value= 'ready'></section>`
		
	}
	document.querySelector('form').innerHTML=body
	//
	
	
	document.querySelector('form').addEventListener('click', await order)
}
async function order(event) {
	let test= event.target.id
	console.log('called')
	console.log(test)
	event.preventDefault()
	let Body={status:'ready'}
	const url20 = `/API/1/TableOrders/${test}`
	const options20 = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(Body)
		
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	const response20 = await fetch(url20, options20)
	console.log(response20)
	const json20 = await response20.json()
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
	console.log(json20)
	localStorage.setItem('redirect','#Kitchen')
	window.location.href = '#home'
	


}