const express = require('express');
const router = express.Router();
const Account = require('../models/Account');
const { auth } = require('../middleware/auth');

// Perform transaction (deposit/withdrawal)
router.post('/', auth, async (req, res) => {
    try {
        const { type, amount } = req.body;
        
        if (!['deposit', 'withdrawal'].includes(type)) {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than 0' });
        }

        const account = await Account.findOne({ userId: req.user._id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (type === 'withdrawal' && account.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Update balance
        account.balance += type === 'deposit' ? amount : -amount;
        
        // Add transaction to history
        account.transactions.push({
            type,
            amount,
            timestamp: new Date()
        });

        await account.save();

        res.json({
            message: `${type} successful`,
            newBalance: account.balance,
            transaction: account.transactions[account.transactions.length - 1]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing transaction' });
    }
});

// Get transaction history
router.get('/history', auth, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user._id });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.json(account.transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history' });
    }
});

module.exports = router; 