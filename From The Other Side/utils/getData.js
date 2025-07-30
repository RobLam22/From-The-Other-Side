import path from 'node:path';
import fs from 'node:fs/promises';

export async function getData() {
    try {
        const pathToJSON = path.join('data', 'data.json');
        const content = await fs.readFile(pathToJSON, 'utf8');
        const parsedData = JSON.parse(content);
        return parsedData;
    } catch (err) {
        console.log(err);
        return []; // empty arr because our data is an array, so easier to handle error if returns an empty arr instead of null or undefeined
    }
}
