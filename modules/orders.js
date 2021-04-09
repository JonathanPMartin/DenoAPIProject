import { db } from './db.js'
export async function delOrd(id){
	let sql3= `DELETE FROM tableOrder WHERE orderid = ${id}`
	let result=await db.query(sql3)
	console.log(result)
	 sql3=`DELETE FROM orders WHERE id = ${id}`
	result=await db.query(sql3)
	console.log(result)
	return result
}
export async function delTaOrd(data){
	
}