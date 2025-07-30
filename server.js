import { createServer } from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
import { handleGet, handlePost, handleNews } from './handlers/routeHandlers.js';

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
            await handleGet(res);
        } else if (req.method === 'POST') {
            handlePost(req, res);
        }
    } else if (req.url === '/api/news') {
        return await handleNews(req, res);
    } else if (!req.url.startsWith('/api')) {
        return await serveStatic(__dirname, req, res);
    }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
