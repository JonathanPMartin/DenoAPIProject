import { customiseNavBar,Updload,fistcall,showMessage,sleepThenAct,AddOrder2} from './browserUtility.js'
export async function setup() {
	if(localStorage.getItem('userjob') !== 'server')window.location.href = '#home'
	let order="Current Order is: "
	var today = new Date();
	let orders=[]
	let order2=[]
	let TRIAL={}
	let date=today.getDate()
	if(date<10){
		date="0"+date
	}
	let month= today.getMonth()+1
				if(month<10){
					month="0"+month
				}
				let year=today.getFullYear()
				let hour=today.getHours()
				if(hour<10){
					hour="0"+hour
				}
				let mins= today.getMinutes()
				if (mins<10){
					mins="0"+mins
				}
				let seconds=today.getSeconds()
				if (seconds<10){
					seconds="0"+seconds
				}
				let time=date+":"+month+":"+year+"_"+hour+":"+mins+":"+seconds
	let tableid=0
	console.log('HOME')
	console.log(document)
	const username = localStorage.getItem('username')
	console.log(localStorage)
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'Add Order'
	console.log('options')
	console.log(document.querySelector('select[name="itemordered"]'))
	const nav = ['logout', 'foo']
	customiseNavBar(nav)
	const url1 = `/API/1/Menu`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	let response = await fetch(url1, options1)
	let json = await response.json()
	for (let i = 0; i < json.length; i++) {
		if(json[i].status!=='NA'){
			//button add
			let button = document.createElement("button");
			button.innerHTML = json[i].MenuItem;
			button.class='.button'
			button.id='test'
			let body = document.getElementsByName("PAG")[0]
			body.appendChild(button);
			button.addEventListener ("click", function() {
				console.log(json[i].MenuItem)
				
				console.log(time)
				let Body={
					status:"placed",
					details:document.querySelector('select[name="Status"]').value,
					ordertime:time,
					userid:localStorage.getItem('userid')
				}
				let TRIALBODY={
					menuid:json[i].id,
					details:document.querySelector('select[name="Status"]').value
					
				}
				order2.push(TRIALBODY)
				let TRIAL = {
					userid:localStorage.getItem('userid'),
					tableid:tableid
				}
				let alldata={}
				alldata.body1=Body
				alldata.url1=json[i].id
				
				let id =json[i].id
				let data={
					body:Body,
					url:`1/Orders/${id}`
				}
				//Updload(data)
				 data={
					url:`/1/Orders/${time}`
					 //url:'Orders/10:04:2021_12:05:49'
			
				}
				alldata.url2=time
				
				Body={
					status:'placed',
					details:document.querySelector('select[name="Status"]').value
				}
				data={
					body:Body,
					url:`/1/TableOrder/${tableid}`
				}
				alldata.url3=`/1/TableOrder/${tableid}`
				alldata.url4=tableid
				alldata.body3=Body
				orders.push(alldata)
				order=order+json[i].MenuItem+" + "
			
			})
	
		}
	}
	const url2 = `/API/1/Table/Taken`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	console.log(json2)
	
	for (let i = 0; i < json2.length; i++) {
		let button = document.createElement("button");
		let test=json2[i].id
		test=test+6
		test=test/10
		button.innerHTML = test;
		button.class='.button'
		button.id='test'
		let body = document.getElementsByName("div")[0]
		body.appendChild(button);
		let x=json2[i].id
		console.log('££££££££££££££££££££££££££££££££££££££££££££££££££')
		console.log(document.getElementsByTagName("div")[0])
		button.addEventListener ("click", function() {
			console.log(json2[i].id)
			tableid=json2[i].id
			var menu = document.querySelector('.hidden') // Using a class instead, see note below.
			menu.classList.toggle('hidden');
			menu = document.querySelector('.hidden')
			menu.classList.toggle('hidden');
			menu = document.querySelector('.hidden')
			menu.classList.toggle('hidden');
			menu = document.querySelector('.hidden')
			menu.classList.toggle('hidden');
			document.querySelector('aside').classList.toggle('hidden')
			menu = document.querySelector('.div')
			menu.classList.toggle('hidden');
			const toggleClass = (el, className) => el.classList.toggle(className);
			var element = document.getElementById('test');
			element.classList.toggle('hidden');
		
		});
		
	}
	let button2 = document.createElement("button");
		button2.innerHTML = 'Submit Table Order';
		button2.class='.button'
		button2.id='test'
		let body2 = document.getElementsByName("div2")[0]
		body2.appendChild(button2);
		console.log('££££££££££££££££££££££££££££££££££££££££££££££££££')
		console.log(document.getElementsByTagName("div2")[0])
		button2.addEventListener ("click", function() {
			//
			time
			var today = new Date();
	let date=today.getDate()
	if(date<10){
		date="0"+date
	}
	let month= today.getMonth()+1
				if(month<10){
					month="0"+month
				}
				let year=today.getFullYear()
				let hour=today.getHours()
				if(hour<10){
					hour="0"+hour
				}
				let mins= today.getMinutes()
				if (mins<10){
					mins="0"+mins
				}
				let seconds=today.getSeconds()
				if (seconds<10){
					seconds="0"+seconds
				}
				let time2=date+":"+month+":"+year+"_"+hour+":"+mins+":"+seconds
			console.log('test')
			let body={
				ordertime:time2
			}
			let UpdateOrder={
				url:`/API/1/Orders/Time/${time}`,
				body:body
			}
			localStorage.setItem('orders',orders.length)
			//for (let i = 0; i < orders.length; i++) {
				
				//fistcall(orders[i])
				
			//}
			
			
			let tem=JSON.stringify(order2)
			let output=''
			for (let z = 0; z < tem.length; z++) {
        output += tem[z].charCodeAt(0).toString(2) + " ";
    }
			
			output.trimEnd();
			TRIAL.Detials=tem
			TRIAL.status='placed'
			TRIAL.time=time2
			TRIAL.userid=localStorage.getItem('userid')
			TRIAL.tableid=tableid
			console.log(TRIAL)
			//fistcall(orders)
			//fistcall(TRIAL)
			AddOrder2(TRIAL)
			localStorage.removeItem('orders')
			//Updload(UpdateOrder)
			localStorage.removeItem('orderid')
		})
	let button3 = document.createElement("button");
		button3.innerHTML = 'Current Order';
		button3.class='.button'
		button3.id='test'
		let body3 = document.getElementsByName("div2")[0]
		body3.appendChild(button3);
		console.log('££££££££££££££££££££££££££££££££££££££££££££££££££')
		console.log(document.getElementsByTagName("div2")[0])
		button3.addEventListener ("click", function() {
			showMessage(order)
		})
	document.querySelector('form').addEventListener('submit', await uploadData)
}

async function uploadData(event) {
	event.preventDefault()

}
