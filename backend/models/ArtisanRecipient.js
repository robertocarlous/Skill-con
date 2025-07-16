const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    artisanId: { type: String, required: true },
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankCode: { type: String, required: true },
    recipientCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ArtisanRecipient', recipientSchema);
