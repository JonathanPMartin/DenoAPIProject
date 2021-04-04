
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts'
import { db } from './modules/db.js'
import { extractCredentials, saveFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
const router = new Router()

// the routes defined here
router.get('/', async context => {
	const data = await Deno.readTextFile('static/index.html')
	context.response.body = data
})

router.get('/accounts', async context => {
	console.log('GET /accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify({ status: 'success', data: { username } }, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.post('/accounts', async context => {
	console.log('POST /accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})
router.post('/#AddOrder', async context => {
	console.log('POST /accounts')
})
router.post('/files', async context => {
	console.log('POST /files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		saveFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'file uploaded' })
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})
router.get('/Menu', async context => {
	console.log('why me')
	const host = context.request.url.host
	const sql = 'SELECT * FROM menu;'
	const actors = await db.query(sql)
	actors.forEach(actor => {
		actor.url = `https://${host}/Menu/${actor.id}`
		//delete actor.id
	})
	context.response.body = JSON.stringify(actors, null, 2)
})
router.get(`/Menu/:id`, async context => {
	console.log(context.params.id)
	const sql = `SELECT * FROM menu WHERE id =${context.params.id};`
	const actors = await db.query(sql)
	console.log(actors[0])
	if(actors.length === 0) throw new Error('record not found')
	console.log('test')
	context.response.body = JSON.stringify(actors[0], null, 2)
})
router.post('/Menu/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE menu SET status = "${StaffData.job}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})
router.post('/TableOrder/:id', async context => {
	console.log("/put/TableOrder/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `insert into tableOrder(tableid,status) Values("${id}"","${StaffData.job}")`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})
router.post('/Orders/:id', async context => {
	console.log("/put/Orders/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `insert into orders(orderid,menuid) Values("${id}"","${StaffData.job}")`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})
router.get('/Staff/:id', async context => {
	const sql = `SELECT * FROM staff WHERE id = ${context.params.id};`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	context.response.body = JSON.stringify(actors[0], null, 2)
})

router.post('/Tables/:id', async context => {
	console.log("/put/Tables/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE tables SET status = "${StaffData.job}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})
router.post('/Menu/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE menu SET staus = "${StaffData.job}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})

router.post('/Staff/Job/:id', async context => {
	console.log("/put/Staff/Job/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE staff SET job = "${StaffData.job}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})
router.post('/Staff/Stauts/:id', async context => {
	console.log("/put/Staff/Job/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE staff SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
})
router.get("/(.*)", async context => {      
	const data = await Deno.readTextFile('static/404.html')
	context.response.body = data
})

export default router
