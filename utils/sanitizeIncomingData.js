import sanitizeHtml from 'sanitize-html';

export function sanitizeIncomingHtml(unsanitizedData) {
    const sanitizedData = {};
    for (const [key, value] of Object.entries(unsanitizedData)) {
        if (typeof value === 'string') {
            sanitizedData[key] = sanitizeHtml(value, {
                allowedTags: ['b'],
                allowedAttributes: {},
            });
        } else {
            sanitizedData[key] = value;
        }
    }
    return sanitizedData;
}
