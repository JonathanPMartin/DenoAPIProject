
/* browserUtility.js */

export function customiseNavBar(items) {
	document.querySelectorAll('nav li').forEach(element => {
		const link = element.querySelector('a')
		const [url, hash] = link.href.split('#')
		if(items.includes(hash)) {
			element.style.display = 'block'
		} else {
			element.style.display = 'none'
		}
	})
}

export function highlightNav(page) {
	document.querySelectorAll('nav li').forEach(element => {
		const link = element.querySelector('a')
		const [url, hash] = link.href.split('#')
		if(hash === page) {
			element.classList.add('currentpage')
		} else {
			element.classList.remove('currentpage')
		}
	})
}

export function showMessage(message, delay = 3000) {
	console.log(message)
	document.querySelector('aside p').innerText = message
	document.querySelector('aside').classList.remove('hidden')
	setTimeout( () => document.querySelector('aside').classList.add('hidden'), delay)
}

export function file2Base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(file)
  })
}
export async function Updload(data){
	const url4 = `${data.url}`
	console.log(url4)
				const options4 = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('authorization')
					},
					body: JSON.stringify(data.body)
				}
				console.log(JSON.stringify(options4))
				let response = await fetch(url4, options4)
				let json4 = await response.json()
				return json4
}
export async function Get(data){
	console.log('test 3 1 4')
	console.log(data.url)
	const url2 = data.url
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
	console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
	console.log(json2)
	return json2
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function sleepFor( sleepDuration ){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

export function sleepThenAct(){
  sleepFor(2000);
  console.log("hello js sleep !");
}
export async function trial(data){
	const url2 = `/Orders/${data}`
			const options2 = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('authorization')
				},
			}
			console.log('above call on form')
			const response2 = await fetch(url2, options2)
			let json2= await response2.json()
			console.log(' ABOVE TRIAL')
			console.log(json2)
			
}
export async function AddOrder(data){
	console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
	const url4 = `/Orders/${data.url1}`
	console.log(url4)
	const options4 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data.body1)
	}
	console.log(JSON.stringify(options4))
	let response = await fetch(url4, options4)
	let json4 = await response.json()
	console.log('json data bellow')
	console.log(json4)
	let hope=json4.id
	console.log('bellow first call')
	console.log('time')
	console.log(data.url2)
	const url2 = `/Orders/${data.url2}`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	let json2= await response2.json()
	console.log(' ABOVE TRIAL')
	console.log(json2.id)
	let orderid=json2.id
	data.body3.orderid=json2.id
	console.log(data)
	console.log('bellow seccond call')
	//
	
	const url3 = `/${data.url3}`
	console.log(url3)
	const options3 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data.body3)
	}
	console.log(JSON.stringify(options3))
	let response3 = await fetch(url3, options3)
	let json3 = await response3.json()
	
	console.log('bellow third call')
	
				
}
export async function fistcall(data){
	const url4 ='/AddOrder'
	console.log(url4)
	const options4 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data)
	}
	console.log(JSON.stringify(options4))
	let response = await fetch(url4, options4)
	let json4 = await response.json()
	/*const url4 = `/Orders/${data.url1}`
	console.log(url4)
	const options4 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data.body1)
	}
	console.log(JSON.stringify(options4))
	let response = await fetch(url4, options4)
	let json4 = await response.json()
	await seccondcall(data)
	*/
}
async function seccondcall(data){
	console.log(data.url2)
	const url2 = `/Orders/${data.url2}`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	let json2= await response2.json()
	console.log(' ABOVE TRIAL')
	console.log(json2.id)
	let orderid=json2.id
	console.log(orderid)
	data.body3.orderid=json2.id
	await thirdcall(data)
}
async function thirdcall(data){
	let tem = localStorage.getItem('orders')
	let tem2 = data.body3.orderid-tem
	tem = tem -1 
	data.body3.orderid=tem2
	console.log(tem2)
	localStorage.setItem('orders',tem)
	const url3 = `/${data.url3}`
	console.log(url3)
	const options3 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data.body3)
	}
	console.log(JSON.stringify(options3))
	let response3 = await fetch(url3, options3)
	let json3 = await response3.json()
	console.log('bellow third call')
}