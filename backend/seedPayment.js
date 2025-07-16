require('dotenv').config();
const mongoose = require('mongoose');
const Payment = require('./models/payment');  // 

async function seedPayment() {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const payment = await Payment.create({
        jobId: "test-job-123",
        clientId: "sample-client-id",
        artisanId: "sample-artisan-id",
        amount: 1000,
        paymentReference: "dummy-ref",
        paymentStatus: "paid"
    });

    console.log('Seeded Payment:', payment);

    await mongoose.disconnect();
}

seedPayment();
