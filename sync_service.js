import fs from 'fs';
import http from 'https';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
console.log('[*] Connecting to database node: ' + config.database.node_id);

const req = http.get(config.database.archive_export_url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('[+] Synchronized suppliers data successfully.');
    });
});
req.on('error', (err) => { console.error('[!] Sync failed: ' + err.message); });
