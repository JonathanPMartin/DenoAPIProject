import { customiseNavBar, showMessage,Checkout } from './browserUtility.js'
export async function setup() {
	Checkout()
	console.log('HOME')
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	//if(localStorage.getItem('userjob') !== 'till')window.location.href = '#home'
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Home Page'
	const nav = ['logout', 'foo']
	nav.push('welcome')
	customiseNavBar(nav)
	const url1 = `/GetTableOrders/finished`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	console.log('above call on form')
	const response = await fetch(url1, options1)
	const json = await response.json()
	console.log(json)
	const url2 = `/API/1/GetAllOrders`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	console.log(json2)
	const url3 = `/API/1/Menu`
	const options3 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	//const value = context.request.body({ type: 'json' });
	//const data = await value
	}
	console.log('above call on form')
	const response3 = await fetch(url3, options3)
	const json3 = await response3.json()
	console.log(json3)
	let MenuPrices={}
	for(let i=0; i<json3.length;i++){
		let menuid=json3[i].id
		let price=json3[i].price
		MenuPrices[menuid]=price
	}
	let OrderPrice={}
	for(let i=0; i<json2.length;i++){
		let Price=0
		let order=JSON.parse(json2[i].Detials)
		for(let j=0; j<order.length; j++){
			Price=Price+MenuPrices[order[j].menuid]
			
		}
		let id=json2[i].id
		 OrderPrice[id]=Price
		
	}
	let body=""
	for(let i=0; i<json.length; i++){
		 console.log(OrderPrice[json[i].orderid])
		body=body+`<input type = 'button' id ="${json[i].id}" value= 'ready'></section>`
		
	}
	document.querySelector('form').innerHTML=body
	document.querySelector('form').addEventListener('submit', await uploadData)
}
async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()
	
	
	/*const itemordered = document.querySelector('select[name="itemordered"]').value
	
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