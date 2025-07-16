const express = require('express');
const https = require('https');
const Payment = require('../models/payment');
const ArtisanRecipient = require('../models/ArtisanRecipient');

const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Initiate Payment
router.post('/payments/initiate', async (req, res) => {
    const { email, totalAmount, jobId, clientId, artisanId } = req.body;

    const params = JSON.stringify({
        email,
        amount: totalAmount * 100  
    });

    const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
    };

    const reqPaystack = https.request(options, (resPaystack) => {
        let data = "";

        resPaystack.on("data", (chunk) => data += chunk);

        resPaystack.on("end", async () => {
            const result = JSON.parse(data);

            if (result.status) {
                await Payment.create({
                    jobId,
                    clientId,
                    artisanId,
                    amount: totalAmount,
                    paymentReference: result.data.reference,
                });
            }

            res.json(result);
        });
    });

    reqPaystack.on("error", (error) => res.status(500).json({ error: "Paystack error" }));

    reqPaystack.write(params);
    reqPaystack.end();
});


router.post('/payments/recipient/create', async (req, res) => {
    const { artisanId, accountName, accountNumber, bankCode } = req.body;

    if (!artisanId || !accountName || !accountNumber || !bankCode) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const params = JSON.stringify({
        type: "nuban",
        name: accountName,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN"
    });

    const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transferrecipient",
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(params)
        },
    };

    console.log('Paystack Key:', process.env.PAYSTACK_SECRET_KEY);
    console.log('POST Body Params:', params);

    const reqPaystack = https.request(options, (resPaystack) => {
        let data = "";

        resPaystack.on("data", (chunk) => data += chunk);

        resPaystack.on("end", async () => {
            console.log('Response from Paystack:', data);

            const result = JSON.parse(data);

            if (result.status) {
                // Save recipient code
                await ArtisanRecipient.create({
                    artisanId,
                    accountName,
                    accountNumber,
                    bankCode,
                    recipientCode: result.data.recipient_code,
                });
            }

            res.json(result);
        });
    });

    reqPaystack.on("error", (error) => {
        console.error('HTTPS Request Error:', error.message);
        res.status(500).json({ error: 'Failed to connect to Paystack' });
    });

    reqPaystack.write(params);
    reqPaystack.end();
});


//  Verify Payment 
router.get('/payments/verify/:reference', (req, res) => {
    const reference = req.params.reference;

    const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    };

    const request = https.request(options, (resPaystack) => {
        let data = "";

        resPaystack.on("data", (chunk) => data += chunk);

        resPaystack.on("end", () => {
            const result = JSON.parse(data);
            res.json(result);
        });
    });

    request.on("error", () => res.status(500).json({ error: "Verification failed" }));
    request.end();
});


// POST /payments/release/:jobId
router.post('/payments/release/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const { recipientCode } = req.body;  // The artisan's Paystack recipient_code

    try {
        // Find payment record for the job
        const payment = await Payment.findOne({ jobId });

        if (!payment) {
            return res.status(404).json({ error: "No payment found for this job." });
        }

        if (payment.paymentStatus !== 'paid') {
            return res.status(400).json({ error: "Payment not completed or verified yet." });
        }

        const amountInKobo = payment.amount * 100;

        const params = JSON.stringify({
            source: "balance",
            amount: amountInKobo,
            recipient: recipientCode,
            reason: `Payout for completed job ${jobId}`
        });

        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transfer",
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(params)
            },
        };

        const reqPaystack = https.request(options, (resPaystack) => {
            let data = "";

            resPaystack.on("data", (chunk) => data += chunk);

            resPaystack.on("end", async () => {
                const result = JSON.parse(data);

                if (result.status) {
                    payment.paymentStatus = 'released';  // Mark as released
                    await payment.save();
                }

                res.json(result);
            });
        });

        reqPaystack.on("error", (error) => {
            console.error('Error from Paystack:', error.message);
            res.status(500).json({ error: 'Failed to release payment.' });
        });

        reqPaystack.write(params);
        reqPaystack.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error processing payment release.' });
    }
});


module.exports = router;
