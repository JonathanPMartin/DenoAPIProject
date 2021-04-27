
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.3.2/mod.ts'
import { db } from './modules/db.js'
import { extractCredentials, saveFile, savedata } from './modules/util.js'
import { login, register, User,UserID,Order } from './modules/accounts.js'
import {delOrd,delTaOrd} from './modules/orders.js'
const router = new Router()
//added this line to have a diffrence
// the routes defined here
router.post(`/API/1/TableOrders`, async context => {
	let expected={
		tableid:'num of tableid',
		userid:'num of userid',
		time:'string i.e. 26:04:2021_14:04:36',
		status:'ready'
	}
	console.log("/post/API/1/TableOrders")
	
	console.log('example below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		console.log('testing if this should run')
		let sql1 =`insert into TableOrders(tableid,userid,ordertime,status) Values('${StaffData.tableid}','${StaffData.userid}','${StaffData.time}','${StaffData.status}')`
		console.log(sql1)
		let test = await db.query(sql1)
		console.log('after run of sql')
	context.response.status = 201
	context.response.body = JSON.stringify(test, null, 2)
	console.log('APi test 2')
	}else{
		context.response.status = 500
	}	
})
router.get('/API/1/TableOrders', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = 'SELECT * FROM TableOrders;'
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors[actors.length -1], null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.get('/API/1/TableOrders/All', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = 'SELECT * FROM TableOrders;'
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.get('/API/1/TableOrders/Status/:status', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = `SELECT * FROM TableOrders WHERE status ="${context.params.status}";`
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.get('/API/1/TableOrders/Tableid/:tableid', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = `SELECT * FROM TableOrders WHERE tableid ="${context.params.tableid}";`
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors[actors.length -1], null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.post(`/API/1/Orders`, async context => {
	let expected={
		menuid:'num of menuid',
		TableOrderid:'num of TableOrderid',
		status:'status of order i.e. Starter'
	}
	console.log("/post/API/1/Orders/")
	console.log('demo below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)

	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	
	if(user==username){
		console.log('testing if this should run')
		let sql1 =`insert into Orders(menuid,TableOrderid,status) Values('${StaffData.menuid}','${StaffData.TableOrderid}','${StaffData.details}')`
		console.log(sql1)
		let test = await db.query(sql1)
		console.log('after run of sql')
	context.response.status = 201
	context.response.body = JSON.stringify(test, null, 2)
	console.log('APi test 2')
	}else{
		context.response.status = 500
	}
	
})
router.get('/API/1/Orders', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = 'SELECT * FROM Orders;'
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.put('/API/1/TableOrders/:id', async context => {
	let expected={
		status:'new status i.e. placed'
	}
	console.log('/put/API/1/TableOrders/:id')
	console.log('expected below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	const sql = `UPDATE TableOrders SET status ="${StaffData.status}" WHERE id ="${context.params.id}"`
	console.log(sql)
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors, null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.get('/', async context => {
	const data = await Deno.readTextFile('static/index.html')
	context.response.body = data
})
router.delete("/API/1/TableOrders/:id", async context => {
	const id = context.params.id
	console.log(id)
	const sql2=`DELETE FROM TableOrderDetails WHERE id = "${id}"`
	console.log(sql2)

	const data = {status: 200, msg: `genre ${id} updated to welp`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	console.log('test')
	await db.query(sql2)
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.delete("/API/1/Orders/:TableOrderid", async context => {
	const id = context.params.TableOrderid
	console.log(id)
	const sql2=`DELETE FROM Orders WHERE TableOrderid = "${id}"`
	const data = {status: 200, msg: `genre ${id} updated to welp`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	await db.query(sql2)
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.get('/API/1/accounts', async context => {
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


router.post('/API/1/accounts', async context => {
	console.log('POST /accounts')
	let expected={
		user:'username of new user',
		pass:'password of new user'
	}
	console.log('demo below')
	console.log(expected)
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
router.get(`/API/1/Accounts/User/:user`, async context => {
	
	let x = context.params.user
	let test=await User(x)
	let test2={
		id:test[0].id,
		user:test[0].user
		
	}
	const token = context.request.headers.get('Authorization')
	console.log('above token')
	console.log(token)
	if(token==='3.14159265358979323'){
	context.response.status = 201
	context.response.body = JSON.stringify(test2, null, 2)
	}else{
		console.log('yer problem')
	}
	
})

router.get(`/API/1/Accounts/ID/:id`, async context => {
	
	let x = context.params.id
	let test=await UserID(x)
	console.log(test)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(test[0], null, 2)
	}else{
		console.log()
	}
	
})
router.get('/API/1/Menu', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = 'SELECT * FROM menu;'
	const actors = await db.query(sql)
	console.log(actors)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.get(`/API/1/Menu/:id`, async context => {
	console.log(context.params.id)
	const sql = `SELECT * FROM menu WHERE id =${context.params.id};`
	const actors = await db.query(sql)
	console.log(actors[0])
	if(actors.length === 0) throw new Error('record not found')
	console.log('test')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(actors[0], null, 2)
	}else{
		context.response.status = 500
	}
})
router.get(`/API/1/Menu/Status/:status`, async context => {
	console.log(context.params.status)
	const sql = `SELECT * FROM menu WHERE status =${context.params.status};`
	const actors = await db.query(sql)
	console.log(actors[0])
	if(actors.length === 0) throw new Error('record not found')
	console.log('test')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(actors[0], null, 2)
	}else{
		context.response.status = 500
	}
})
router.put('/API/1/Menu/:id', async context => {
	console.log("/put/Menu/:id")
	let expected={
		status:'new status i.e. NA'
	}
	console.log('demo below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData.status)
	const id = context.params.id
	const sql = `UPDATE menu SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})

/*router.post('/TableOrder/Status/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData.status)
	const id = context.params.id
	const sql = `UPDATE tableOrder SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})*/

//

/*router.post('/Orders/:menuid', async context => {
	console.log("/put/Orders/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const menuid = context.params.menuid
	const sql = `insert into orders(menuid,userid,ordertime) Values("${menuid}","${StaffData.userid}","${StaffData.ordertime}")`
	console.log(sql)
	await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	const data = {status: 200, msg: `new order added`}
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		console.log('error')
		context.response.status = 500
	}
})*/

/*router.get('/Orders/:ordertime', async context => {
	console.log('correct route in place')
	let time =context.params.ordertime
	time=time.toString()
	const sql = `SELECT * FROM orders WHERE ordertime = "${context.params.ordertime}";`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors[actors.length - 1], null, 2)
	context.response.body = JSON.stringify(actors[actors.length - 1], null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors[0], null, 2)
	
	
	savedata(x)
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})*/
/*
router.post('/TableOrder/:id', async context => {
	console.log("/put/TableOrder/:id")
	const body = await context.request.body()
	console.log(body)
	const StaffData = await body.value
	const id = context.params.id
	const sql = `insert into tableOrder(tableid,orderid,status,details ) Values(${id},${StaffData.orderid },"${StaffData.status}", "${StaffData.details}")`
	console.log(sql)
	await db.query(sql)
	console.log('test')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})*/
//

//note routes below where before database was noramalised to third normal form and work with the old tables these routes remain in case needed by another devloper, they are not used in the product itself
router.post('/API/1/AddOrder', async context => {
	console.log("/put/AddOrder/")
	console.log('warning you are using an outted route please consider checking route at /API')
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)

	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	
	if(user==username){
		console.log('testing if this should run')
		let sql1 =`insert into OrderDetails(Detials) Values('${StaffData.Detials}')`
		console.log(sql1)
		let test = await db.query(sql1)
		console.log('after run of sql')
	context.response.status = 201
	context.response.body = JSON.stringify(test, null, 2)
	console.log('APi test 2')
	}else{
		context.response.status = 500
	}
})
router.post('/API/1/AddTableOrder', async context => {
	console.log("/put/AddTableOrder/")
	console.log('warning you are using an outted route please consider checking route at /API')
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)

	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	
	if(user==username){
		console.log('testing if this should run')
		let sql1 =`insert into TableOrderDetails(tableid,userid,orderid,ordertime,status) Values(${StaffData.tableid},${StaffData.userid},${StaffData.orderid},'${StaffData.time}','${StaffData.status}')`
		console.log(sql1)
		await db.query(sql1)
		console.log('after run of sql')
	let test ={data:'ok'}
	context.response.status = 201
	context.response.body = JSON.stringify(test, null, 2)
	console.log('APi test 2')
	}else{
		context.response.status = 500
	}
})
//below route may not be called 
router.get('/API/1/GetOrder', async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	console.log('well this should show')
	const sql = `SELECT * FROM OrderDetails`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors[0], null, 2)
	context.response.body = JSON.stringify(actors[actors.length -1], null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	savedata(x)
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.get('/API/1/GetAllOrders', async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	console.log('well this should show')
	const sql = `SELECT * FROM OrderDetails`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors, null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.get('/API/1/GetAllTableOrders', async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	console.log('well this should show')
	const sql = `SELECT * FROM TableOrderDetails`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors, null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.get('/API/1/GetTableOrders/:status', async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	
	console.log('well this should show')
	const sql = `SELECT * FROM TableOrderDetails where status ="${context.params.status}"`
	console.log(sql)
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors, null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})
router.put('/API/1/UpdateTableOrders/:id', async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	console.log('well this should show')
	const body = await context.request.body()
	const StaffData = await body.value
	const sql = `UPDATE TableOrderDetails SET status ="${StaffData.status}" WHERE id ="${context.params.id}"`
	console.log(sql)
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors, null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})

router.delete("/API/1/DeleteTableOrders/:id", async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	const id = context.params.id
	console.log(id)
	const sql2=`DELETE FROM TableOrderDetails WHERE id = "${id}"`
	console.log(sql2)

	const data = {status: 200, msg: `genre ${id} updated to welp`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	console.log('test')
	await db.query(sql2)
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
router.delete("/API/1/DeleteOrders/:id", async context => {
	console.log('warning you are using an outted route please consider checking route at /API')
	const id = context.params.id
	console.log(id)
	const sql2=`DELETE FROM OrderDetails WHERE id = "${id}"`
	const data = {status: 200, msg: `genre ${id} updated to welp`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	await db.query(sql2)
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})
/*router.delete("/Orders/:id", async context => {
	const id = context.params.id
	
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		await delOrd(id)
		context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})*/

/*router.post('/Orders/Time/:ordertime', async context => {
	console.log("/put/Orders/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const sql = `UPDATE orders SET ordertime ="${StaffData.ordertime}" WHERE ordertime="${context.params.ordertime}";`
	console.log(sql)
	await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	const data = {status: 200, msg: `genre test updated to ${StaffData}`}
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		console.log('error')
		context.response.status = 500
	}
})*/
/*router.get('/TableOrder', async context => {
	console.log('well this should show')
	const sql = `SELECT * FROM tableOrder;`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors[0], null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	savedata(x)
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})*/
/*router.get('/Orders', async context => {
	console.log('well this should show')
	const sql = `SELECT * FROM orders;`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.statusText = JSON.stringify(actors[0], null, 2)
	context.response.body = JSON.stringify(actors, null, 2)
	console.log('APi test 1')
	console.log(context.response.body)
	const x= JSON.stringify(actors, null, 2)
	
	
	savedata(x)
	}else{
		context.response.status = 500
	}
	//localStorage.setItem('data' , JSON.stringify(actors[0], null, 2))
})*/
/*router.delete("/TableOrder/:table", async context => {
	const table = context.params.table
	console.log(table)
	const sql2=`DELETE FROM tableOrder WHERE tableid = "${table}`
	await db.query(sql2)
	const data = {status: 200, msg: `genre ${table} updated to welp`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	await delTaOrd()
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		context.response.status = 500
	}
})*/
router.get('/API/1/Staff/:id', async context => {
	const sql = `SELECT * FROM staff WHERE staffid = ${context.params.id};`
	const actors = await db.query(sql)
	if(actors.length === 0) throw new Error('record not found')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
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
router.get('/API/1/Online/Staff', async context => {
	const host = context.request.url.host
	console.log('test')
	const sql = 'SELECT * FROM staff WHERE status= "Online";'
	const actors = await db.query(sql)
	actors.forEach(actor => {
		actor.url = `https://${host}/Menu/${actor.id}`
		delete actor.id
	})
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
	})
router.put('/API/1/Staff/Set/Job/:id', async context => {
	let expected ={
		job:'new job i.e. cheff'
	}
	console.log("/put/Staff/Set/Job/:id")
	console.log('demo below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)
	const id = context.params.id
	const sql = `UPDATE staff SET job = "${StaffData.job}" WHERE staffid = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	console.log(context.response.body)
	console.log('APi test 4')
	}else{
		context.response.status = 500
	}
})
router.put('/API/1/Staff/Stauts/:id', async context => {
	let expected ={
		status:'new status i.e. Online'
	}
	console.log("/put/Staff/Job/:id")
	console.log('demo below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE staff SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	return
	}else{
		context.response.status = 500
	}
})
router.post('/API/1/Staff/New/:id',async context => {
	let expected ={
		staffid:'value of staffid'
	}
	console.log('/post/API/1/Staff/New/:id')
	console.log('demo below')
	console.log(expected)
	const sql=`insert into staff(job, staffid, status) values("None",${context.params.id},"Offline")`
	
	const data = {we:'did it'}
	const token = context.request.headers.get('Authorization')||'fail'
	console.log('above token')
	console.log(token)
	console.log(token==='3.14159265358979323')
	if(token==='3.14159265358979323'){
		console.log('test')
		console.log(sql)
		await db.query(sql)
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	}else{
		
		context.response.status = 500
	}
} )
router.get('/API/1/Table/:Status', async context => {
	const host = context.request.url.host
	console.log('test')
	const sql = `SELECT * FROM tables WHERE status= "${context.params.Status}";`
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
	})
router.put('/API/1/Tables/:id', async context => {
	let expected ={
		status:'new status i.e. NA'
	}
	console.log("/put/Tables/:id")
	console.log('example below')
	console.log(expected)
	const body = await context.request.body()
	const StaffData = await body.value
	console.log(StaffData)
	const id = context.params.id
	const sql = `UPDATE tables SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
	context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	console.log('APi test 2')
	return
	}else{
		context.response.status = 500
	}
})

/*router.post('/API/1/Menu/:id', async context => {
	console.log("/put/Menu/:id")
	const body = await context.request.body()
	const StaffData = await body.value
	const id = context.params.id
	const sql = `UPDATE menu SET status = "${StaffData.status}" WHERE id = ${id}`
	console.log(sql)
	await db.query(sql)
	const data = {status: 200, msg: `genre ${id} updated to ${StaffData}`}
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
	context.response.body = JSON.stringify(data, null, 2)
	console.log('APi test 3')
	}else{
		context.response.status = 500
	}
	
	return
})*/

router.get('/API/1/TESTING', async context => {
	console.log('in route')
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
	}else{
		context.response.status = 500
	}
})
router.get('/API', async context => {
	const host = context.request.url.host
	console.log('test')
	let baseurl=`https://${host}/API/1`
	const data = {
		name: 'Website API',
		desc: 'A list of all API Routes. where the name indicates the http request. if a href has /:item at its end it indicates that the link its end is expecting a input i.e. /Accounts/ID/1 is an exsample request for /Accounts/ID/:id  the API uses BASIC authentication unless otherwise specified',
		links: [
			{
				name: 'get accounts',
				desc: 'checks to see if the account info is correct',
				href: `${baseurl}/accounts`,
			},
			{
				name: 'post accounts',
				desc: 'adds a new account to the table uses pi for authorisation header',
				href: `${baseurl}/accounts`,
			},
			{
				name: ' get accounts',
				desc: 'filters accounts by user where user = :user uses pi for authorisation header',
				href: `${baseurl}/Accounts/User/:user`
			},
			{
				name: ' get accounts',
				desc: 'filters accounts by user where id = :id',
				href: `${baseurl}/Accounts/ID/:id`
			},
			{
				name: ' get menu',
				desc: 'gets all menu items',
				href: `${baseurl}/Menu`
			},
			{
				name: ' get menu',
				desc: 'gets Menu where id = :id',
				href: `${baseurl}/Menu/:id`
			},
			{
				name: ' get menu',
				desc: 'gets Menu by status where status = :status',
				href: `${baseurl}/Menu/Status/:status`
			},
			{
				name: ' put Menu',
				desc: 'updates Menu status where id = :id',
				href: `${baseurl}/Menu/:id`
			},
			{
				name: ' post TableOrders',
				desc: 'Adds a new TalbeOrder to the Table TableOrders',
				href: `${baseurl}/TableOrders`
			},
			{
				name: ' get TableOrders',
				desc: 'returns the last item from the Table TableOrders',
				href: `${baseurl}/TableOrders`
			},
			{
				name: ' get TableOrders',
				desc: 'returns all items from the Table TableOrders',
				href: `${baseurl}/TableOrders/All`
			},
			{
				name: ' get TableOrders',
				desc: 'returns items from the Table TableOrders where tableid = :tableid',
				href: `${baseurl}/TableOrders/Tableid/:tableid`
			},
			{
				name: ' post Orders',
				desc: 'adds a new order into the table Orders',
				href: `${baseurl}/Orders`
			},
			{
				name: ' get Orders',
				desc: 'gets all items into the table Orders',
				href: `${baseurl}/Orders`
			},
			{
				name: ' put TableOrders',
				desc: 'updates the status of TableOrders where id = :id',
				href: `${baseurl}/TableOrders/:id`
			},
			{
				name: ' delete TableOrders',
				desc: 'deletes items from TableOrders where id = :id',
				href: `${baseurl}/TableOrders/:id`
			},
			{
				name: ' delete Orders',
				desc: 'deletes items from Orders where TableOrderid = :TableOrderid',
				href: `${baseurl}/TableOrders/:TableOrderid`
			},
			{
				name: ' get Staff',
				desc: 'Gets Staff where id =:id',
				href: `${baseurl}/Staff/:id`
			},
			{
				name: ' get Staff',
				desc: 'Gets the members of Staff Online',
				href: `${baseurl}/Online/Staff`
			},
			{
				name: ' put Staff',
				desc: 'Updates Job of Staff where id =:id',
				href: `${baseurl}/Staff/Set/Job/:id`
			},
			{
				name: ' put Staff',
				desc: 'Updates status of staff whre id =:id',
				href: `${baseurl}/Staff/Status/:id`
			},
			{
				name: ' post Staff',
				desc: 'Adds a new member of staff Where Staffid=:id uses pi for authorisation header',
				href: `${baseurl}/Staff/New/:id`
			},
			{
				name: ' get Table',
				desc: 'Gets table by status where status=:Status',
				href: `${baseurl}/Table/:Status`
			},
			{
				name: ' put Tables',
				desc: 'Updates the status of the table where the id is :id',
				href: `${baseurl}/Tables/:id`
			}
		]
	}
	context.response.body = JSON.stringify(data, null, 2)
})
router.get('/API/1/TableTest', async context => {
	console.log('why me')
	
	const host = context.request.url.host
	const sql = 'show tables;'
	const actors = await db.query(sql)
	const token = context.request.headers.get('Authorization')
	const credentials = extractCredentials(token)
	const username = await login(credentials)
	const { user, pass } = credentials
	console.log(user===username)
	if(user==username){
		context.response.status = 201
		context.response.body = JSON.stringify(actors, null, 2)
	}else{
		context.response.status = 201
		context.response.body = JSON.stringify('fail', null, 2)
	}
})
router.get("/(.*)", async context => {      
	const data = await Deno.readTextFile('static/404.html')
	context.response.body = data
})

export default router
