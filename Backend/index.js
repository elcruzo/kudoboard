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

app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.status(200).json(boards)
});

app.get('/boards/:id', async (req, res) => {
    const {id} = req.params
    console.log(id);
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) }
    });
    res.status(200).json(board)
});

app.post('/api/boards', async (req, res) => {
  try {
    const { title, category, author } = req.body;
    const newBoard = await prisma.board.create({
      data: { title, category, author }
    });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: 'Error creating board' });
  }
});

app.put('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const {title, category, author} = req.body;
    const updatedBoard = await prisma.board.update({
        where: { id: parseInt(id) },
        data: {
            title,
            category,
            author
        }
    });
    res.status(200).json(updatedBoard);
});

app.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(id) }
    });
    res.status(200).json(deletedBoard);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
