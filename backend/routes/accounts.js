const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const { auth, isBanker } = require('../middleware/auth');

// Get all accounts (banker only)
router.get('/', auth, isBanker, async (req, res) => {
    try {
        const accounts = await Account.find().populate('userId', 'name email');
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts' });
    }
});

// Get user's account
router.get('/my-account', auth, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user._id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching account' });
    }
});

// Get specific account (banker only)
router.get('/:accountId', auth, isBanker, async (req, res) => {
    try {
        const account = await Account.findById(req.params.accountId)
            .populate('userId', 'name email');
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching account' });
    }
});

// Get specific account by account number (banker only)
router.get('/number/:accountNumber', auth, isBanker, async (req, res) => {
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber })
            .populate('userId', 'name email');
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching account by number' });
    }
});

module.exports = router; 