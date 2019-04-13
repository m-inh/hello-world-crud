const http = require('http');
const url = require('url');
const host = 'localhost';
const port = process.env.PORT;

function readWorld() {
    return 'world';
};

function createWorld() {
    return 'world created';
};

function updateWorld() {
    return 'world updated';
};

function deleteWorld() {
    return 'world deleted';
};

function invalidMethod() {
    return 'Invalid method!';
};

const routeConfig = [
    {
        path: '/hello',
        acts: {
            'GET': readWorld,
            'POST': createWorld,
            'PUT': updateWorld,
            'DELETE': deleteWorld,
        },
    }
];

const server = http.createServer((req, res) => {
    const location = url.parse(req.url);
    const foundConfig = routeConfig.find(route => route.path === location.pathname);
    const message = foundConfig
        ? (foundConfig.acts[req.method] || invalidMethod)()
        : 'URL not found!';
    console.log(message);
    res.write(message);
    res.end();
});

server.listen(port, host, () => {console.log(`Server is listening on ${host}:${port}`)});
