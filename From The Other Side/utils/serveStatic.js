import path from 'node:path';
import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

export async function serveStatic(dir, req, res) {
    const publicDir = path.join(dir, 'public');
    const resPath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url
    );
    const extensions = path.extname(resPath);
    try {
        const content = await fs.readFile(resPath);
        sendResponse(res, getContentType(extensions), 200, content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            const errorContent = await fs.readFile(
                path.join(publicDir, '404.html')
            );
            sendResponse(res, 'text/html', 404, errorContent);
        } else {
            sendResponse(
                res,
                'text/html',
                500,
                '<html><h1>Server Error: ${err.code}</h1></html>'
            );
        }
    }
}
