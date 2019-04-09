const http = require('http');
const url = require('url');
const host = 'localhost';
const port = 2000;

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
    if (foundConfig) {
        const message = (foundConfig.acts[req.method] || invalidMethod)();
        console.log(message);
        res.write(message);
    } else {
        console.log('URL not found!');
    }
    res.end();
});

server.listen(port, host, () => {console.log(`Server is listening on ${host}:${port}`)});