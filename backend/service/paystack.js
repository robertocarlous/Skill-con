const express = require('express');
const https = require('https');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();


// POST /api/payments/initiate
router.post("/payments/initiate", async (req, res) => {
  const { email, totalAmount, jobId, clientId, artisanId } = req.body;

  const amount = parseFloat(totalAmount);
  if (isNaN(amount) || amount <= 0 || amount % 1 !== 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const params = JSON.stringify({
    email: email,
    amount: totalAmount * 100 // Paystack expects amount in Kobo
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

  const reqPaystack = https.request(options, async (resPaystack) => {
    let data = "";

    resPaystack.on("data", (chunk) => data += chunk);

    resPaystack.on("end", async () => {
      const response = JSON.parse(data);

      if (response.status) {
        await Payment.create({
          jobId,
          clientId,
          artisanId,
          amount,
          paymentReference: response.data.reference,
        });
      }

      res.json(response);
    });
  });

  reqPaystack.on("error", () => res.status(500).json({ error: "Paystack error" }));

  reqPaystack.write(params);
  reqPaystack.end();
});


module.exports = { router };