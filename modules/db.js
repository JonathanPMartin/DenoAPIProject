
/* db.js */

import { Client } from 'https://deno.land/x/mysql/mod.ts'

const home = Deno.env.get('HOME')
console.log(`HOME: ${home}`)
const connectionData = {
  '/home/codio':  {
    /*
    hostname: '127.0.0.1',
    username: 'websiteuser',
    password: 'websitepassword',
    db: 'website'
	*/
	hostname: 'us-cdbr-east-03.cleardb.com',
    username: 'be472a846bb862',
    password: '8fba6f73',
    db: 'heroku_5190cbd0f577dc6' 
  },
  '/app': {
		hostname: 'us-cdbr-east-03.cleardb.com',
    username: 'be472a846bb862',
    password: '8fba6f73',
    db: 'heroku_5190cbd0f577dc6'
  }
}

const conn = connectionData[home]
console.log(conn)

const db = await new Client().connect(conn)

export { db }
