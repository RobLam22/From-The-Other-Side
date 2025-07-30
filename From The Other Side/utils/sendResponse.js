export function sendResponse(res, mimeType, statusCode, payload) {
    res.setHeader('Content-Type', mimeType);
    res.statusCode = statusCode;
    res.end(payload);
}
