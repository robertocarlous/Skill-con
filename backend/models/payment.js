const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    jobId: { type: String, required: true },
    clientId: { type: String, required: true },
    artisanId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentReference: { type: String, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'released', 'disputed', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const recipientSchema = new mongoose.Schema({
    artisanId: { type: String, required: true },
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankCode: { type: String, required: true },
    recipientCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
