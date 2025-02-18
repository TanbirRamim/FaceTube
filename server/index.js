const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

function generateToken04(appId, serverSecret, userId, roomId, effectiveTimeInSeconds) {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = Math.floor(Math.random() * 2147483647);
  
  const payload = {
    app_id: appId,
    user_id: userId,
    room_id: roomId,
    nonce,
    ctime: timestamp,
    expire: timestamp + effectiveTimeInSeconds
  };

  const message = JSON.stringify(payload);
  const hmac = crypto.createHmac('sha256', serverSecret);
  const signature = hmac.update(message).digest('base64');

  return `04${Buffer.from(message).toString('base64')}${signature}`;
}

app.post('/api/generate-token', (req, res) => {
  try {
    const { roomId, userId } = req.body;
    console.log('Received request for token:', { roomId, userId });
    
    const token = generateToken04(
      parseInt(process.env.ZEGO_APP_ID),
      process.env.ZEGO_SERVER_SECRET,
      userId,
      roomId,
      3600
    );
    
    console.log('Token generated successfully');
    res.json({ token });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});