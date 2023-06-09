
/* index.js */

import { Application, Status, send } from 'https://deno.land/x/oak/mod.ts'
// status codes https://deno.land/std@0.82.0/http/http_status.ts
import { setHeaders } from './modules/util.js'
import { login } from './modules/accounts.js'
import * as flags from "https://deno.land/std/flags/mod.ts"
import router from './api.js'
const{args}=Deno
const Normalport = 8070
const Seccondport = flags.parse(args).port
console.log(Seccondport)
const port = Seccondport ? Number(Seccondport ):Normalport
const app = new Application()

// checks if file exists
async function fileExists(path) {
  try {
    const stats = await Deno.lstat(path)
    return stats && stats.isFile
  } catch(e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false
    } else {
		console.log('so something went wrong and you are putting this code here be')
      throw e
    }
  }
}

async function staticFiles(context, next) {
	const path = `${Deno.cwd()}/static${context.request.url.pathname}`
  const isFile = await fileExists(path)
  if (isFile) {
		// file exists therefore we can serve it
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/static`
    })
  } else {
    await next()
  }
}

async function errorHandler(context, next) {
	try {
		const method = context.request.method
		const path = context.request.url.pathname
		console.log(`${method} ${path}`)
    await next()
  } catch (err) {
		console.log(err)
		context.response.status = Status.InternalServerError
		const msg = { err: err.message }
		context.response.body = JSON.stringify(msg, null, 2)
  }
}

app.use(staticFiles)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(setHeaders)
app.use(errorHandler)

app.addEventListener('listen', ({ port }) => console.log(`listening on port: ${port}`) )

await app.listen({ port })
