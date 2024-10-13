import express from 'express';
import bodyParser from 'body-parser';
import { sequelize, initializeDB } from './config/DBconfig.js';

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
initializeDB(); 

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

const LogMdw = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.setHeader('Content-Type', 'application/json', 'text/start');
  next();
};
app.use(LogMdw);

// Assuming you have an array of objects in memory
const data = [
  { id: 1, name: 'John', lastname: 'Doe', email: 'john.doe@example.com', password: 'hello' },
  { id: 2, name: 'Jane', lastname: 'Donaldson', email: 'jane.donaldson@example.com', password: 'world' },
  // ...
];

app.get('/', (req, res) => {
  const parameters = req.query;
  const id = parameters.id;
  const name = parameters.name;
  const lastname = parameters.lastname;
  const email = parameters.email;
  const password = parameters.password;

  const result = data.find((entry) => {
    if (id && entry.id === parseInt(id)) return true;
    if (name && entry.name === name) return true;
    if (lastname && entry.lastname === lastname) return true;
    if (email && entry.email === email) return true;
    if (password && entry.password === password) return true;
    return false;
  });

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ error: 'Entry not found' });
  }
});

app.get('/:id', LogMdw, (req, res) => {
  const userId = req.params.id;
  const user = data.find((entry) => entry.id === parseInt(userId));
  if (user) {
    res.send(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/', (req, res) => {
  const { id, name, lastname, email, password } = req.body;
  const newObj = { id, name, lastname, email, password };
  data.push(newObj);
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ error: 'Missing request body' });
  } else {
    const { id, name, lastname, email, password } = req.body;
    res.send({ id, name, lastname, email, password });
    console.log({ id, name, lastname, email, password});
  }
});

app.put('/:id', (req, res) => {
  const userId = req.params.id;
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({ error: 'Missing request body' });
  } else {
    const { id, name, lastname, email, password } = req.body;
    const index = data.findIndex((entry) => entry.id === parseInt(userId));
    if (index !== -1) {
      data[index] = { id: userId, name, lastname, email, password };
      res.send({ id: userId, name, lastname, email, password: '**********' });
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  }
});

app.delete('/:id', (req, res) => {
  const userId = req.params.id;
  const index = data.findIndex((entry) => entry.id === parseInt(userId));
  if (index !== -1) {
    data.splice(index, 1);
    res.send("Successfully deleted!");
  } else {
    res.status(404).json({ error: 'Entry not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});

