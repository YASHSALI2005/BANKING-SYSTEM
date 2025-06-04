const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [{
        type: {
            type: String,
            enum: ['deposit', 'withdrawal'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Generate account number before saving
accountSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    }
    next();
});

module.exports = mongoose.model('Account', accountSchema); 