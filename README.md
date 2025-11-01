# Fleet Management Server Application

This project is a websocket server application that listens on a specified IP address and port. It is designed to send two .mp3 audio files to clients upon connection and to transmit the server's current latitude and longitude every minute.

## Project Structure

```
fleet-management-server
├── src
│   ├── server.ts          # Entry point for the websocket server
│   ├── config
│   │   └── settings.ts    # Configuration settings for the server
│   ├── types
│   │   └── index.ts       # TypeScript types and interfaces
│   └── utils
│       └── location.ts    # Utility functions for geolocation
├── assets
│   ├── audio1.mp3         # First audio file to send to clients
│   └── audio2.mp3         # Second audio file to send to clients
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd fleet-management-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the server**:
   ```bash
   npm start
   ```

## Usage

- Upon connecting to the WebSocket server, clients will receive two audio files.
- The server will send its current latitude and longitude to connected clients every minute.

## License

This project is licensed under the MIT License.