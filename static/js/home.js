/* home.js */
import { customiseNavBar,Home,sleepThenAct} from './browserUtility.js'
export async function setup() {
	if (localStorage.getItem('userid')== undefined){
		window.location.href = '#login'
	}
	sleepThenAct(1000)
	const envURl='/Enivorment'
	const envOptions={
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	const envResponce=await fetch(envURl, envOptions)
	const envDetails=await envResponce.json()
	const env=envDetails.test !=='/home/codio'
	console.log(env)
	console.log('HOME')
	console.log('above testing of the new route being added')
	let result=await Home()
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
	const url3 = `/API/1/Staff/${localStorage.getItem('userid')}`
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
	
	let tableorderdetails=result
	console.log('above new results')
	console.log(result)
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
		let tem = tableorderdetails[i].table
			if (env){
			console.log(env)
			tem=tem+6
			tem=tem/10
		}
		cell1.innerHTML = tem;
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
	}else if(localStorage.getItem('userjob') ==='welcome'){
		nav.push('welcome')
	}else if(localStorage.getItem('userjob') ==='till'){
		nav.push('Checkout')
	}else{
		console.log('welp')
	}
	customiseNavBar(nav)
	//document.querySelector('form').addEventListener('submit', await uploadData)
	//console.log(localStorage.getItem('userjob'))
}
async function uploadData(event) {
	console.log('called')
	
	event.preventDefault()

}