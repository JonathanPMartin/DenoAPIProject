import { customiseNavBar } from './browserUtility.js'
import { db } from '\./modules/db.js'
console.log(db)
//x= await db.query('SELECT * FROM menu;')

//const sql = 'SELECT * FROM staff;'
//const actors = await db.query(sql)
//console.log(actors)
export async function setup() {
	console.log('manger')
	let option = document.createElement("option");
	option.text = "Kiwi";
	document.querySelector('select[name="users"]').add(option)
	const username = localStorage.getItem('username')
	console.log(`username: ${username}`)
	if(username === null) window.location.href = '#login'
	document.querySelector('h1').innerText = 'test'
	const nav = ['logout', 'foo','home']
	customiseNavBar(nav)
	document.querySelector('form').addEventListener('submit', await uploadData)
}

async function uploadData(event) {
	console.log('called')
	event.preventDefault()
	
	
	
	const id = document.querySelector('input[name="userid"]').value
	const Job=document.querySelector('input[name="job"]').value
	console.log(Job)
	const Body={
		job:Job
	}
	console.log(JSON.stringify(Body))
	const file = document.querySelector('input[name="file"]').files[0]
	
	
	const url = `/staff/${id}`
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

}