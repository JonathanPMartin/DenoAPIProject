export async function setup() {
			const url2 = `/Orders/10:04:2021_13:06:38`
			const options2 = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': '3.14159265358979323'
				},
			}
			console.log('above call on form')
			const response2 = await fetch(url2, options2)
			let json2= await response2.json()
			console.log(json2)
			}