// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const comments = [];
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const parsedPath = parsedUrl.pathname;
    const parsedQuery = parsedUrl.query;
    if (parsedPath === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const comment = JSON.parse(body);
            comments.push(comment);
            res.end('Comment added');
        });
    } else if (parsedPath === '/comments' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else {
        const filename = path.join(__dirname, 'public', parsedPath);
        fs.readFile(filename, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('File not found');
                return;
            }
            res.end(data);
        });
    }
});
server.listen(3000, () => {
    console.log('Server is listening...');
});
