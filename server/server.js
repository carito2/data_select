import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import cors from 'cors';

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = {
    "tables": [
        {
          "name": "Tabla 1",
          "id": "uid-1"
        },
        {
          "name": "Tabla 2",
          "id": "uid-2"
        },
        {
          "name": "Tabla 3",
          "id": "uid-3"
        }
      ],
    "requests": [],
    "results": []
}
const db = new Low(adapter, defaultData)

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Habilita CORS
app.use(cors());

await db.read();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/tables', (req, res) => {
    const tables = db.data.tables;
    res.send(tables);
})
//Request
app.post('/request',express.json(), (req, res) => {
    console.log(req.body);
    db.data.requests.push(req.body);
    db.write();
    res.status(200).send(req.body);
})
//Result
app.post('/result',express.json(), (req, res) => {
    console.log(req.body);
    db.data.results.push(req.body);
    db.write();
    res.status(200).send(req.body);
})

app.listen(3030, function () {
    console.log('listening on 3030');
});


