const express = require('express');
// // const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
// const sendVerificationEmail = require('../utils/mailer');
// const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        })

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        await prisma.verificationToken.create({
            data: {
                token,
                userId: user.id,
            },
        });

        await sendVerificationEmail(email, token);
        res.status(201).json({ message: 'User registered. Verification email sent.' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Email Verification
router.get('/verify/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const verificationToken = await prisma.verificationToken.findUnique({ where: { token } });

        if (!verificationToken) return res.status(400).json({ message: 'Invalid token' });

        await prisma.user.update({
            where: { id: verificationToken.userId },
            data: { isVerified: true },
        });

        await prisma.verificationToken.delete({ where: { token } });
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(400).json({ message: 'Email not found' });
        if (!user.isVerified) return res.status(400).json({ message: 'Email not verified' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.header('Authorization', 'Bearer ' + token).json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Protected Route Example
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
});

module.exports = router;
