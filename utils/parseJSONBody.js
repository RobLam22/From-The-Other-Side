export async function parseJSONBody(req, res) {
    try {
        let body = '';
        for await (let chunk of req) {
            body += chunk;
        }
        const parsedData = JSON.parse(body);
        return parsedData;
    } catch (err) {
        console.log(`Invalid JSON format: ${err}`);
        throw new Error(`Invalid JSON format: ${err}`);
    }
}
