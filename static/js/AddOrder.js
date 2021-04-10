import { customiseNavBar,Updload,Get,sleepThenAct, trial} from './browserUtility.js'
export async function setup() {
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
	const url1 = `/Menu`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': '3.14159265358979323'
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
				let time=date+":"+month+":"+year+"_"+hour+":"+mins+":"+seconds
				console.log(time)
				let Body={
					status:"placed",
					details:document.querySelector('select[name="Status"]').value,
					ordertime:time,
					userid:localStorage.getItem('userid')
				}
				let id =json[i].id
				let data={
					body:Body,
					url:`Orders/${id}`
				}
				//Updload(data)
				 data={
					url:`Orders/${time}`
					 //url:'Orders/10:04:2021_12:05:49'
			
				}
				time = '10:04:2021_13:09:30'
				console.log(trial(time))
				let test = trial(time)
				let test2= test.id
				trial(time).Promise 
				console.log('above shit')
				console.log(test)
				console.log('above the string stuff')
				console.log(Object.values(test))
				let result= Get(data).valueOf()
				console.log('above x')
				let x= result
				console.log(x)
				Body={
					orderid:result.id,
					status:'placed',
					details:document.querySelector('select[name="Status"]').value
				}
				data={
					body:Body,
					url:`TableOrder/${tableid}`
				}
				sleepThenAct()
				Updload(data)
				sleepThenAct()
				Updload(data)
				console.log(result)
				//poss solutions have the form called itself outside
				//have everything done by a single function to see where errors lie
				//
			
			})
	
		}
	}
	const url2 = `Table/Taken`
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
	console.log(json2)
	
	for (let i = 0; i < json2.length; i++) {
		let button = document.createElement("button");
		button.innerHTML = json2[i].id;
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
		let button2 = document.createElement("button");
		button2.innerHTML = 'test';
		button2.class='.button'
		button2.id='test'
		let body2 = document.getElementsByName("div2")[0]
		body2.appendChild(button2);
		console.log('££££££££££££££££££££££££££££££££££££££££££££££££££')
		console.log(document.getElementsByTagName("div2")[0])
		button2.addEventListener ("click", function() {
		console.log('test')
		})
	}
	document.querySelector('form').addEventListener('submit', await uploadData)
}

async function uploadData(event) {
	event.preventDefault()

}
