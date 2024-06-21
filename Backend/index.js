require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/route')
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

// GET ENDPOINTS

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

app.get('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(boardId) }
        });
        res.status(200).json(board);
    } catch (error) {
        console.error('Error fetching board:', error);
        res.status(500).json({ error: 'Error fetching board' });
    }
});

app.get('/boards/:boardId/cards', async (req, res) => {
    const { boardId } = req.params;
    try {
        const cards = await prisma.card.findMany({
            where: {
                boardId: parseInt(boardId),
            },
            include: {
                comments: true,
            },
        });
        res.status(200).json(cards);
    } catch (error) {
        console.error(`Error fetching cards for board ${boardId}:`, error);
        res.status(500).json({ error: `Error fetching cards for board ${boardId}` });
    }
});

app.get('/cards/:cardId', async (req, res) => {
    const { cardId } = req.params;
    try {
        const card = await prisma.card.findUnique({
            where: { id: parseInt(cardId) },
            include: {
                comments: true,
            },
        });
        res.status(200).json(card);
    } catch (error) {
        console.error(`Error fetching card ${cardId}:`, error);
        res.status(500).json({ error: `Error fetching card ${cardId}` });
    }
});

// POST ENDPOINTS

app.post('/boards', async (req, res) => {
    try {
        const { title, category, author } = req.body;
        const newBoard = await prisma.board.create({
            data: { title, category, author }
        });
        res.status(201).json(newBoard);
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ error: 'Error creating board' });
    }
});

app.post('/boards/:boardId/cards', async (req, res) => {
    const { boardId } = req.params;
    const { message, gifUrl, textMessage, author } = req.body;
    try {
        const newCard = await prisma.card.create({
            data: {
                message,
                gifUrl,
                textMessage,
                author,
                boardId: parseInt(boardId)
            }
        });
        res.status(201).json(newCard);
    } catch (error) {
        console.error(`Error creating card for board ${boardId}:`, error);
        res.status(500).json({ error: `Error creating card for board ${boardId}` });
    }
});

// PUT ENDPOINTS

app.put('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const { title, category, author } = req.body;
    try {
        const updatedBoard = await prisma.board.update({
            where: { id: parseInt(boardId) },
            data: {
                title,
                category,
                author
            }
        });
        res.status(200).json(updatedBoard);
    } catch (error) {
        console.error('Error updating board:', error);
        res.status(500).json({ error: 'Error updating board' });
    }
});

app.put('/cards/:cardId/sign', async (req, res) => {
    const { cardId } = req.params;
    try {
        const card = await prisma.card.findUnique({
            where: { id: parseInt(cardId) },
            include: {
                comments: true,
            }
        });

        if (!card) {
            return res.status(404).json({ error: `Card ${cardId} not found` });
        }

        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: {
                isSigned: !card.isSigned,
            },
            include: {
                comments: true,
            },
        });

        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(`Error toggling sign status for card ${cardId}:`, error);
        res.status(500).json({ error: `Error toggling sign status for card ${cardId}` });
    }
});

app.put('/cards/:cardId/upvote', async (req, res) => {
    const { cardId } = req.params;
    try {
        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: {
                upvotes: {
                    increment: 1,
                },
            },
            include: {
                comments: true,
            },
        });
        res.status(200).json(updatedCard);
    } catch (error) {
        console.error(`Error upvoting card ${cardId}:`, error);
        res.status(500).json({ error: `Error upvoting card ${cardId}` });
    }
});

//PATCH ENDPOINTS

app.patch('/cards/:cardId/comments', async (req, res) => {
    const { cardId } = req.params;
    const { content } = req.body;
    try {
        const updatedCard = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: {
                comments: {
                    create: {
                        content
                    }
                }
            },
            include: {
                comments: true
            }
        });
        res.json(updatedCard);
    } catch (error) {
        console.error(`Error adding comment to card ${cardId}:`, error);
        res.status(500).json({ error: `Error adding comment to card ${cardId}` });
    }
});

// DELETE ENDPOINTS

app.delete('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {
        const deletedBoard = await prisma.board.delete({
            where: { id: parseInt(boardId) }
        });
        res.status(200).json(deletedBoard);
    } catch (error) {
        console.error('Error deleting board:', error);
        res.status(500).json({ error: 'Failed to delete' });
    }
});

app.delete('/cards/:cardId', async (req, res) => {
    const { cardId } = req.params;
    try {
        // First delete all comments associated with the card
        await prisma.comment.deleteMany({
            where: {
                cardId: parseInt(cardId),
            },
        });

        // Then delete the card
        const deletedCard = await prisma.card.delete({
            where: {
                id: parseInt(cardId),
            },
        });

        res.status(200).json(deletedCard);
    } catch (error) {
        console.error(`Error deleting card ${cardId}:`, error);
        res.status(500).json({ error: `Error deleting card ${cardId}` });
    }
});

// LISTEN
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
