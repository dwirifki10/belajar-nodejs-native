const http = require("http");

const requestListener = (request, response) => {
	response.setHeader('Content-Type', 'application/json');
	response.setHeader('X-Powered-By', 'NodeJS');
	
	const {url, method} = request;

	if(url === "/"){
		if(method === "GET"){
			response.statusCode = 200;
			response.end(JSON.stringify({
				"message" : "Landing Page"
			}));
		}else{
			response.statusCode = 404;
			response.end(JSON.stringify({
				"message" : "Unknown Method Status"
			}));
		}
	}else if(url === "/about"){
		if(method === "GET"){
			response.statusCode = 200;
			response.end(JSON.stringify({
				"message" : "Page About"
			}));
		}else if(method === "POST"){
			response.statusCode = 200;
			let body = [];

			request.on('data', (chunk) => {
				body.push(chunk);
			});

			request.on('end', () => {
				body = Buffer.concat(body).toString();
				const {name} = JSON.parse(body);
				response.end(JSON.stringify({
					"message" : `${name}`
				}));
			});
		}else{
			response.statusCode = 404;
			response.end(JSON.stringify({
				"message" : "Unknown Status Method"
			}));
		}
	}else{
		response.statusCode = 404;
		response.end(JSON.stringify({
			"message" : "Page Not Found"
		}));
	}
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
	console.log(`server running on http://${host}:${port}`);
}); 