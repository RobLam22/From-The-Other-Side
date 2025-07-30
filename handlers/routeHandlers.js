import { getData } from '../utils/getData.js';
import { parseJSONBody } from '../utils/parseJSONBody.js';
import { sendResponse } from '../utils/sendResponse.js';
import { addNewSighting } from '../utils/addNewSighting.js';
import { sanitizeIncomingHtml } from '../utils/sanitizeIncomingData.js';
import { sightingEvents } from '../events/sightingEvents.js';
import { stories } from '../data/stories.js';

export async function handleGet(res) {
    const data = await getData();
    return sendResponse(res, 'application/json', 200, JSON.stringify(data));
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req);
        const santizedBody = sanitizeIncomingHtml(parsedBody);
        await addNewSighting(santizedBody);
        sightingEvents.emit('sighting-added', santizedBody);
        sendResponse(
            res,
            'application/json',
            201,
            JSON.stringify(santizedBody)
        );
    } catch (err) {
        sendResponse(
            res,
            'application/json',
            400,
            JSON.stringify({ error: err })
        );
    }
}

export async function handleNews(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    setInterval(() => {
        let randomIndex = Math.floor(Math.random() * stories.length);
        res.write(
            `data: ${JSON.stringify({ event: 'news-event', story: stories[randomIndex] })}\n\n`
        );
    }, 3000);
}
