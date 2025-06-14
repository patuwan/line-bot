require('dotenv').config();
const express = require('express');
const { middleware, Client } = require('@line/bot-sdk');

const app = express();
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};
const client = new Client(config);

// Webhook endpoint
app.post('/webhook', middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(evt => {
      return client.replyMessage(evt.replyToken, {
        type: 'text',
        text: 'สวัสดีจาก LINE Bot!',
      });
    }))
    .then(() => res.sendStatus(200))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LINE Bot is running on port ${port}`);
});
