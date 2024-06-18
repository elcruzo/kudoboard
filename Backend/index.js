require('dotenv').config()
const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Test</title>
            </head>
            <body>
                <h1>Hello, World!</h1>
                <p>Welcome to my server.</p>
            </body>
        </html>
    `)
})

app.post('/api/boards', async (req, res) => {
  try {
    const { title, category, author } = req.body;
    const newBoard = await prisma.board.create({
      data: { title, category, author }
    });
    res.json(newBoard);
  } catch (error) {
    res.status(500).json({ error: 'Error creating board' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
