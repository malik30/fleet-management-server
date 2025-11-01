export interface WebSocketMessage {
    type: string;
    payload: any;
}

export interface ServerConfig {
    ip: string;
    port: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}