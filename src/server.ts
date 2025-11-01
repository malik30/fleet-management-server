import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import { getCurrentLocation } from './utils/location';
import { IP_ADDRESS, PORT, settings } from './config/settings';

const app = express();

// Serve assets folder as a simple CDN at /assets
const assetsPath = path.join(__dirname, '../assets');
app.use('/assets', express.static(assetsPath));

// Create HTTP server and attach WebSocket server to it
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    console.log('Client connected', req.socket.remoteAddress);

    // Send metadata message with full URLs to audio files (CDN)
    const baseUrl = `http://${IP_ADDRESS}:${PORT}`;
    const audioFiles = [
        `${baseUrl}/assets/audio1.mp3`,
        `${baseUrl}/assets/audio2.mp3`
    ];

    const metaMessage = {
        type: 'meta',
        audioFiles
    };

    ws.send(JSON.stringify(metaMessage));

    // Send current latitude and longitude every minute with type "location"
    const locationInterval = setInterval(async () => {
        try {
            ws.send('ping'); // keep-alive ping
            const { latitude, longitude } = await getCurrentLocation();
            const locationMessage = {
                type: 'location',
                latitude,
                longitude
            };
            ws.send(JSON.stringify(locationMessage));
        } catch (err) {
            console.error('Failed to get location', err);
        }
    }, settings.locationUpdateInterval); // every 6 seconds

    // Clean up on close
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(locationInterval);
    });

    ws.on('error', (err) => {
        console.error('WebSocket client error', err);
        clearInterval(locationInterval);
    });
});

wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

server.listen(PORT, IP_ADDRESS, () => {
    console.log(`HTTP + WebSocket server running at http://${IP_ADDRESS}:${PORT}`);
    console.log(`Assets served from ${assetsPath} at /assets`);
});