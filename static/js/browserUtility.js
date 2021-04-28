
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

export function sleepThenAct(dur){
  sleepFor(dur);
  console.log("hello js sleep !");
}
export async function trial(data){
	const url2 = `/API/1/Orders/${data}`
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
	const url4 = `/API/1/Orders/${data.url1}`
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
	const url2 = `/API/1/Orders/${data.url2}`
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
	
	const url3 = `${data.url3}`
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
	const url4 ='/API/1/AddOrder'
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
	console.log('THIS IS ABOVE THE DATA')
	console.log(json4)
	//
	const url2 = `/API/1/GetOrder`
	const options2 = {
		method: 'GET',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
	}
	const response2 = await fetch(url2, options2)
	let json2= await response2.json()
	console.log(json2)
	data.orderid=json2.id
	//
	const url3 ='/API/1/AddTableOrder'
	console.log(url3)
	const options3 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(data)
	}
	console.log(JSON.stringify(options3))
	let response3 = await fetch(url3, options3)
	let json3 = await response3.json()
	console.log(json3)
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
	const url2 = `/API/1/Orders/${data.url2}`
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
export async function AddOrder2(data){
	console.log('above me normaising the database')
	data.Detials
	data.status
	data.tableid
	data.time
	data.userid
	
	const url4 ='/API/1/TableOrders'
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
	console.log('above POST REQUEST for TableOrders')
	console.log('THIS IS ABOVE THE DATA')
	console.log(json4)
	//
	const url2 = `/API/1/TableOrders`
	const options2 = {
		method: 'GET',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
	}
	const response2 = await fetch(url2, options2)
	let json2= await response2.json()
	console.log(json2)
	//data.TableOrderid=json2.id
	let orders=JSON.parse(data.Detials)
	let lastorder=''
	for (let i=0;i<orders.length;i++){
		console.log(orders[i])
		orders[i].TableOrderid=json2.id
		const url3 ='/API/1/Orders'
	console.log(url3)
	const options3 = {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		'Authorization': localStorage.getItem('authorization')
		},
		body: JSON.stringify(orders[i])
	}
	let response3 = await fetch(url3, options3)
	let json3 = await response3.json()
	console.log('ABOVE POST REQUEST FOR Orders')
	console.log(json3)
	lastorder=json3
	}
	console.log(orders)
	return lastorder
}
export async function Kitchen(){
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
	const url2 = `/API/1/Orders`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	let TableOrder={}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	for(let i =0;i<json2.length;i++){
		let menuid=json2[i].menuid
		let orderid=json2[i].TableOrderid
		
		if (TableOrder[json2[i].TableOrderid]==undefined){
			let items={}
			if (env){
			for(let j=4;j<198;j=j+10){
				items[j]=0
			}
			}else{
				for(let j=1;j<21;j=j+1){
				items[j]=0
			}
			}
			TableOrder[orderid]=items
		}
		//
		let tem=TableOrder[json2[i].TableOrderid]
		tem[json2[i].menuid]=tem[json2[i].menuid]+1
		console.log(tem)
		TableOrder[json2[i].TableOrderid]=tem
	}
	console.log('Above TableORder')
	const url1 = `/API/1/TableOrders/Status/placed`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	
	const response1 = await fetch(url1, options1)
	const json1=await response1.json()
	console.log('above json1')
	console.log(json1)
	let Display=[]
	let times={}
	for(let i=0; i<json1.length; i++){
		let time= json1[i].ordertime.substr(11, 17);
		
		let items = TableOrder[json1[i].id]
		let order="Items Ordered:"
		if(env){
		for(let j=4;j<198;j=j+10){
			if (items[j]!==0){
				let tem = Menu[j]+" x"+items[j]
				
				if (order==="Items Ordered:"){
					order=order+" "+tem
				}else{
					order=order+", "+tem
				}
			}
		}
	}else{
		for(let j=1;j<21;j=j+1){
			if (items[j]!==0){
				let tem = Menu[j]+" x"+items[j]
				
				if (order==="Items Ordered:"){
					order=order+" "+tem
				}else{
					order=order+", "+tem
				}
			}
		}
	}
		let body={
			time:time,
			id:json1[i].id,
			items:order
		}
		times[time]=body
		
	}
	console.log('times')
	console.log(times)
	let keys= Object.keys(times)
	keys=keys.sort()
	console.log(keys)
	for(let j=0;j<keys.length;j++){
		Display.push(times[keys[j]])
	}
	return Display
	
}
export async function Checkout(){
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
	let prices={}
	for (let i=0; i<json3.length;i++){
		Menu[json3[i].id]=json3[i].MenuItem
		prices[json3[i].id]=json3[i].price
	}
	const url2 = `/API/1/Orders`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	let TableOrder={}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	
	for(let i =0;i<json2.length;i++){
		let menuid=json2[i].menuid
		let orderid=json2[i].TableOrderid
		
		if (TableOrder[json2[i].TableOrderid]==undefined){
			
			let items={}
			if (env){
			for(let j=4;j<198;j=j+10){
				items[j]=0
			}
			}else{
				for(let j=1;j<21;j=j+1){
					items[j]=0
				}
			}
			TableOrder[orderid]=items
		}
	
		//
		let tem=TableOrder[json2[i].TableOrderid]
		tem[json2[i].menuid]=tem[json2[i].menuid]+1
		console.log(tem)
		TableOrder[json2[i].TableOrderid]=tem
	}
	console.log('Above TableORder')
	const url1 = `/API/1/TableOrders/Status/finished`
	const options1 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	
	const response1 = await fetch(url1, options1)
	const json1=await response1.json()
	console.log('above json1')
	console.log(json1)
	let Display={}
	
	for(let i=0; i<json1.length; i++){
		let time= json1[i].ordertime.substr(11, 17);
		
		let items = TableOrder[json1[i].id]
		let order="Items Ordered:"
		let price=0
		if (env){
		for(let j=4;j<198;j=j+10){
			if (items[j]!==0){
				let tem = Menu[j]+" x"+items[j]
				
				if (order==="Items Ordered:"){
					order=order+" "+tem
				}else{
					order=order+", "+tem
				}
				price=price+prices[j]
			}
			
		}
		}else{
			for(let j=1;j<21;j=j+1){
			if (items[j]!==0){
				let tem = Menu[j]+" x"+items[j]
				
				if (order==="Items Ordered:"){
					order=order+" "+tem
				}else{
					order=order+", "+tem
				}
				price=price+prices[j]
			}
			
		}
		}
		let body={
			time:time,
			id:json1[i].id,
			items:order
		}
		console.log(price)
		body.price=price
		console.log(body)
		Display[json1[i].id]=body
	}
	console.log('Above Display')
	console.log(Display)
	return Display
	
}
export async function Home(){
const url2 = `/API/1/Orders`
	const options2 = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': localStorage.getItem('authorization')
		},
	}
	let TableOrder={}
	console.log('above call on form')
	const response2 = await fetch(url2, options2)
	const json2 = await response2.json()
	console.log(json2)
	for(let i =0;i<json2.length;i++){
		let menuid=json2[i].menuid
		let orderid=json2[i].TableOrderid
		console.log(orderid)
		if(TableOrder[json2[i].TableOrderid]==undefined){
			TableOrder[json2[i].TableOrderid]=1
		}else{
			TableOrder[json2[i].TableOrderid]=TableOrder[json2[i].TableOrderid]+1
		}
	}
	const url4 = `/API/1/TableOrders/All`
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
	console.log(tableorders)
	let tableorderdetails=[]
	for(let i = 0; i <tableorders.length; i++){
		let time=tableorders[i].ordertime
		let time2=time.substr(11, 17);
		console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
		console.log(TableOrder[tableorders[i].id])
		console.log(tableorders[i].id)
		let places=TableOrder[tableorders[i].id]
		let status=tableorders[i].status
		let body={
			table:tableorders[i].tableid,
			places:places,
			time:time2,
			status:status
		}
		if(status==='ready'){
			console.log(status)
			tableorderdetails.push(body)
		}else if(status==='placed'){
			console.log(status)
			tableorderdetails.push(body)
		}
	}
	return tableorderdetails
}