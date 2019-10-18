const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // parse the url so i can get the pathname
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.path;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  const chosenHandler = routes[trimmedPath] ? handlers[trimmedPath] : handlers.notFound;
  chosenHandler((statusCode, message) => {
      statusCode = statusCode || 200;
      res.writeHead(statusCode);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(message));
    });
});

// start server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
})

const handlers = {
  notFound: (callback) => {
    callback(404, {error: 'Route not found'});
  },
  hello: (callback) => {
    callback(200, {message: 'Hello World!!!'})
  }
}

const routes = {
  hello: handlers.hello
}