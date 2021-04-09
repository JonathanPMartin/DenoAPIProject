
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts'
import { db } from './modules/db.js'
import { extractCredentials, saveFile, savedata } from './modules/util.js'
import { login, register, User,UserID } from './modules/accounts.js'
import {delOrd,delTaOrd} from './modules/orders.js'
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
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
	}else{
		console.log('errror')
	}
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
router.get(`/Accounts/User/:id`, async context => {
	
	let x = context.params.id
	let test=await User(x)
	console.log(test)
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(test[0], null, 2)
	}else{
		console.log()
	}
	
})
router.get(`/Accounts/ID/:id`, async context => {
	
	let x = context.params.id
	let test=await UserID(x)
	console.log(test)
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(test[0], null, 2)
	}else{
		console.log()
	}
	
})
router.get('/Menu', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = 'SELECT * FROM menu;'
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.get(`/Menu/:id`, async context => {
	console.log(context.params.id)
	const sql = `SELECT * FROM menu WHERE id =${context.params.id};`
	const actors = await db.query(sql)
	console.log(actors[0])
	if(actors.length === 0) throw new Error('record not found')
	console.log('test')
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(actors[0], null, 2)
	}else{
		context.response.status = 500
	}
})
router.get(`/Menu/Status/:status`, async context => {
	console.log(context.params.status)
	const sql = `SELECT * FROM menu WHERE status !=${context.params.status};`
	const actors = await db.query(sql)
	console.log(actors[0])
	if(actors.length === 0) throw new Error('record not found')
	console.log('test')
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(actors[0], null, 2)
	}else{
		context.response.status = 500
	}
})
router.post('/Menu/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData.status)
	const id = context.params.id
	const sql = `UPDATE menu SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.post('/TableOrder/:id', async context => {
	console.log("/put/TableOrder/:id")
	const body = await context.request.body()
	console.log(body)
	const StaffData = await body.value
	const id = context.params.id
	const sql = `insert into tableOrder(tableid,orderid,status) Values(${id},${StaffData.orderid },"${StaffData.status}")`
	console.log(sql)
	await db.query(sql)
	console.log('test')
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.post('/TableOrder/Status/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData.status)
	const id = context.params.id
	const sql = `UPDATE tableOrder SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.post('/Orders/:menuid', async context => {
	console.log("/put/Orders/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const menuid = context.params.menuid
	const sql = `insert into orders(menuid,details,userid,ordertime) Values("${menuid}","${StaffData.details}","${StaffData.userid}","${StaffData.ordertime}")`
	console.log(sql)
	await db.query(sql)
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	const data = {status: 200, msg: `genre ${menuid} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		console.log('error')
		context.response.status = 500
	}
})
router.delete("/Orders/:id", async context => {
	const id = context.params.id
	
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	const data = {status: 200, msg:`genre updated to welp`}
	if(token==="3.14159265358979323"){
		context.response.status = 201
		await delOrd(id)
		context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.get('/Orders/:ordertime', async context => {
	let time =context.params.ordertime
	time=time.toString()
	const sql = `SELECT * FROM orders WHERE ordertime = "${context.params.ordertime}";`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors[0], null, 2)
	context.response.body = JSON.stringify(actors[0], null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors[0], null, 2)
	
	
	savedata(x)
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.delete("/TableOrder/:table", async context => {
	const table = context.params.table
	console.log(table)
	const sql2=`DELETE FROM tableOrder WHERE tableid = "${table}`
	await db.query(sql2)
	const data = {status: 200, msg: `genre ${table} updated to welp`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	await delTaOrd()
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.get('/Staff/:id', async context => {
	const sql = `SELECT * FROM staff WHERE staffid = ${context.params.id};`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors[0], null, 2)
	context.response.body = JSON.stringify(actors[0], null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors[0], null, 2)
	
	
	savedata(x)
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.get('/Online/Staff', async context => {
	const host = context.request.url.host
	console.log('test')
	const sql = 'SELECT * FROM staff WHERE status= "Online";'
	const actors = await db.query(sql)
	actors.forEach(actor => {
		actor.url = `https://${host}/Menu/${actor.id}`
		delete actor.id
	})
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
	})
router.get('/Staff/Online/:job', async context => {
	console.log('why me')
	const host = context.request.url.host
	const job= context.params.job
	const sql = `SELECT * FROM staff where status = online; AND job=${job}`
	const actors = await db.query(sql)
	actors.forEach(actor => {
		actor.url = `https://${host}/Menu/${actor.id}`
		//delete actor.id
	})
	})
router.post('/Staff/Set/Job/:id', async context => {
	console.log("/put/Staff/Set/Job/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE staff SET job = "${StaffData.job}" WHERE staffid = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	console.log(context.response.body)
	console.log('APi test 4')
	}else{
		context.response.status = 500
	}
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
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	return
	}else{
		context.response.status = 500
	}
})
router.post('/Staff/New/:id',async context => {
	const sql=`insert into staff(job, staffid, status) values("None",${context.params.id},"Offline");`
	await db.query(sql)
	const data = {status: 200, msg: `new data ${context.params.id} created`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
} )
router.get('/Table/:Status', async context => {
	const host = context.request.url.host
	console.log('test')
	const sql = `SELECT * FROM tables WHERE status= "${context.params.Status}";`
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
	})
router.post('/Tables/:id', async context => {
	console.log("/put/Tables/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)
	const id = context.params.id
	const sql = `UPDATE tables SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	console.log('APi test 2')
	return
	}else{
		context.response.status = 500
	}
})
router.post('/Menu/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE menu SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log(token)
	if(token==="3.14159265358979323"){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	console.log('APi test 3')
	return
	}else{
		context.response.status = 500
	}
})


router.get("/(.*)", async context => {      
	const data = await Deno.readTextFile('static/404.html')
	context.response.body = data
})

export default router
