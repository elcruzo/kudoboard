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

//GET ENDPOINTS

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
    try {
        const { search } = req.query;
        let boards;
        if (search) {
          boards = await prisma.board.findMany({
            where: {
              title: {
                contains: search,
                mode: 'insensitive',
              },
            },
          });
        } else {
          boards = await prisma.board.findMany();
        }
        res.status(200).json(boards);
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).json({ error: 'Error fetching boards' });
    }
});

app.get('/boards/:id', async (req, res) => {
    const {id} = req.params
    console.log(id);
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) }
    });
    res.status(200).json(board)
});

app.get('/api/boards/:boardId/cards', async (req, res) => {
    const { boardId } = req.params;
    try {
      const cards = await prisma.card.findMany({
        where: {
          boardId: parseInt(boardId),
        },
      });
      res.status(200).json(cards);
    } catch (error) {
      console.error(`Error fetching cards for board ${boardId}:`, error);
      res.status(500).json({ error: `Error fetching cards for board ${boardId}` });
    }
  });

//POST ENDPOINTS
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

    app.post('/api/boards/:boardId/cards', async (req, res) => {
      const { boardId } = req.params;
      const { message, gifUrl } = req.body;

      try {
          const newCard = await prisma.card.create({
              data: {
                  message,
                  gifUrl,
                  boardId: parseInt(boardId)
              }
          });
          res.status(201).json(newCard);
      } catch (error) {
          console.error(`Error creating card for board ${boardId}:`, error);
          res.status(500).json({ error: `Error creating card for board ${boardId}` });
      }
  });

    //PUT ENDPOINTS

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


app.put('/api/cards/:cardId/sign', async (req, res) => {
    const { cardId } = req.params;
    try {
    const updatedCard = await prisma.card.update({
        where: { id: parseInt(cardId) },
        data: { isSigned: true },
    });
    res.status(200).json(updatedCard);
    } catch (error) {
    console.error(`Error signing card ${cardId}:`, error);
    res.status(500).json({ error: `Error signing card ${cardId}` });
    }
});

app.put('/api/cards/:cardId/upvote', async (req, res) => {
    const { cardId } = req.params;
    try {
      const updatedCard = await prisma.card.update({
        where: { id: parseInt(cardId) },
        data: {
          upvotes: {
            increment: 1,
          },
        },
      });
      res.status(200).json(updatedCard);
    } catch (error) {
      console.error(`Error upvoting card ${cardId}:`, error);
      res.status(500).json({ error: `Error upvoting card ${cardId}` });
    }
});

//DELETE ENDPOINTS

app.delete('/boards/:id', async (req, res) => {
    const {id} = req.params;
    const deletedBoard = await prisma.board.delete({
        where: { id: parseInt(id) }
    });
    res.status(200).json(deletedBoard);
});

app.delete('/api/cards/:cardId', async (req, res) => {
    const { cardId } = req.params;
    try {
      const deletedCard = await prisma.card.delete({
        where: { id: parseInt(cardId) },
      });
      res.status(200).json(deletedCard);
    } catch (error) {
      console.error(`Error deleting card ${cardId}:`, error);
      res.status(500).json({ error: `Error deleting card ${cardId}` });
    }
});

//LISTEN
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
