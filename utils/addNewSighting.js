import fs from 'node:fs/promises';
import path from 'node:path';
import { getData } from './getData.js';
import { sanitizeIncomingHtml } from './sanitizeIncomingData.js';

export async function addNewSighting(newSighting) {
    try {
        const data = await getData();
        data.push(newSighting);
        const newDataStringed = JSON.stringify(data, null, 2);
        const pathToJSON = path.join('data', 'data.json');
        // const content = await fs.writeFile(pathToJSON, newDataStringed, 'utf8');
    } catch (err) {
        throw new Error(err);
    }
}
